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


export const setSecureCookie = (name: string, value: string, timestamp: number): void => {
    const expiresDate = new Date(timestamp * 1000);

    document.cookie = `${name}=${value}; path=/; max-age=${expiresDate.toUTCString()}; secure; httponly`;
};

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=; path=/; max-age=-1`;
};
