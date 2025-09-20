import {ITokenResponse} from "@/modules/auth/types";

export function getCookie(name: string): string | null {
    const cookieStr = document.cookie;

    if (!cookieStr) return null;

    for (const part of cookieStr.split(";")) {
        const [rawName, ...rest] = part.split("=");

        if (rawName && rawName.trim() === name) {
            const rawValue = rest.join("=");

            return  rawValue?.trim() ?? "";
        }
    }

    return null;
}


export const setAuthCookie = (name: string, value: string, timestamp: number): void => {
    const expiresDate = new Date(timestamp * 1000);

    document.cookie = `${name}=${value}; path=/; expires=${expiresDate.toUTCString()}`;
};

export const removeAuthCookie = (name: string): void => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
