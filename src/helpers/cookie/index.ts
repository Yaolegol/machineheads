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


export const setCookie = (name: string, value: string, maxAge: number): void => {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
};

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=; path=/; max-age=-1`;
};
