import {REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from '@/modules/auth/store/constants'

export const loginRequest = (email: string, password: string) => ({
    type: LOGIN_REQUEST,
    payload: { email, password },
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT,
});

export const refreshTokenRequest = () => ({
    type: REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = () => ({
    type: REFRESH_TOKEN_SUCCESS,
});

export const refreshTokenFailure = () => ({
    type: REFRESH_TOKEN_FAILURE,
});