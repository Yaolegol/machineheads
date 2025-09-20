import {ITokenResponse} from "@/modules/auth/types";
import {removeCookie, setSecureCookie} from "@/helpers/cookie";
import {ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME} from "@/modules/auth/constants";

export const updateAuthCookie = ({access_token, access_expired_at, refresh_token, refresh_expired_at}: ITokenResponse) => {
    setSecureCookie(ACCESS_TOKEN_COOKIE_NAME, access_token, access_expired_at);
    setSecureCookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token, refresh_expired_at);
}

export const clearAuthCookie = () => {
    removeCookie(ACCESS_TOKEN_COOKIE_NAME);
    removeCookie(REFRESH_TOKEN_COOKIE_NAME);
}