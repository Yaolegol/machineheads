import {apiClient} from "@/core/api";

interface ILoginServiceProps {
    email: string;
    password: string;
}

export const loginService = async ({email, password}: ILoginServiceProps) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return apiClient.post('/auth/token-generate', formData);
}