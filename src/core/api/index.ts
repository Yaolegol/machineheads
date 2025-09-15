import { getCookie, setCookie } from '@/helpers/cookie';

const API_BASE_URL = 'https://rest-test.machineheads.ru';

export interface ApiResponse<T> {
    data: T;
    response: Response;
}

class ApiClient {
    private request = async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
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
            const newToken = await this.refreshToken(refreshToken);

            if (newToken) {
                setCookie('accessToken', newToken, 3600);

                this.setHeaderToken(headers, newToken);

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

    private refreshToken = async (refreshToken: string): Promise<string | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const { accessToken } = await response.json();

                return accessToken;
            }
        } catch (error) {
            console.error('Refresh token failed:', error);
        }

        return null;
    }

    public get = async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    public post = async <T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    public put = async <T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    public delete = async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();