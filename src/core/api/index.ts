import { getCookie } from '@/helpers/cookie';
import {ITokenResponse} from "@/modules/auth/types";
import {updateAuthCookie} from "@/modules/auth/helpers";
import {ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_API_NAME, REFRESH_TOKEN_COOKIE_NAME} from "@/modules/auth/constants";

const API_BASE_URL = 'https://rest-test.machineheads.ru';

type TOptions = RequestInit

export interface ApiResponse<T> {
    data: T;
    response: Response;
}

export interface IRefreshTokenProps {
    refresh_token: string;
}

class ApiClient {
    private request = async <T>(endpoint: string, options: TOptions): Promise<ApiResponse<T>> => {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);
        const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_NAME);

        const headers: HeadersInit = {
            ...options.headers,
        };

        if (token) {
            this.setHeaderToken(headers, token);
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.status === 401 && refreshToken) {
            const formData = new FormData();
            formData.append(REFRESH_TOKEN_API_NAME, refreshToken);

            const refreshTokenData = await this.refreshToken(formData);

            if (refreshTokenData) {
                updateAuthCookie(refreshTokenData);

                this.setHeaderToken(headers, refreshTokenData.access_token);

                const retryResponse = await fetch(url, {
                    ...options,
                    headers,
                });

                return this.getResponseData(retryResponse);
            }
        }

        return this.getResponseData(response);
    }

    private setHeaderToken = (headers: HeadersInit, token?: string) => {
        if (token) {
            // @ts-ignore
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    private getResponseData = async (response: Response) => {
        return {
            data: await response.json(),
            response,
        }
    }

    public refreshToken = async (data: FormData): Promise<ITokenResponse | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/token-refresh`, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                return response.json();
            }
        } catch (error) {
            console.error('Refresh token failed:', error);
        }

        return null;
    }

    public get = async <T>(endpoint: string, options?: TOptions): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    public post = async <T>(endpoint: string, data?: any, options?: TOptions): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data,
        });
    }

    public put = async <T>(endpoint: string, data?: any, options?: TOptions): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    public delete = async <T>(endpoint: string, options?: TOptions): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();