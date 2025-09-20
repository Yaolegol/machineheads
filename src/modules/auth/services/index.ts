import {apiClient, ApiResponse} from "@/core/api";
import {ITokenResponse} from "@/modules/auth/types";
import {REFRESH_TOKEN_API_NAME} from "@/modules/auth/constants";

interface ILoginServiceProps {
    email: string;
    password: string;
}

export const loginService = async ({email, password}: ILoginServiceProps): Promise<ApiResponse<ITokenResponse>> => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return apiClient.post('/auth/token-generate', formData);
}

export const refreshTokenService = async (token: string): Promise<ITokenResponse | null> => {
    const formData = new FormData();
    formData.append(REFRESH_TOKEN_API_NAME, token);

    return apiClient.refreshToken(formData);
}