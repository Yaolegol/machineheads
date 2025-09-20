import {ITokenResponse} from "@/modules/auth/types";
import {removeAuthCookie, setAuthCookie} from "@/helpers/cookie";
import {ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME} from "@/modules/auth/constants";

export const updateAuthCookie = ({access_token, access_expired_at, refresh_token, refresh_expired_at}: ITokenResponse) => {
    setAuthCookie(ACCESS_TOKEN_COOKIE_NAME, access_token, access_expired_at);
    setAuthCookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token, refresh_expired_at);
}

export const clearAuthCookie = () => {
    removeAuthCookie(ACCESS_TOKEN_COOKIE_NAME);
    removeAuthCookie(REFRESH_TOKEN_COOKIE_NAME);
}