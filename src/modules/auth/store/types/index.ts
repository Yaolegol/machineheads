import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT, REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS
} from "@/modules/auth/store/constants";

export interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: { email: string; password: string };
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
}

export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export interface RefreshTokenRequestAction {
    type: typeof REFRESH_TOKEN_REQUEST;
}

export interface RefreshTokenSuccessAction {
    type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface RefreshTokenFailureAction {
    type: typeof REFRESH_TOKEN_FAILURE;
}

export type AuthActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutAction
    | RefreshTokenRequestAction
    | RefreshTokenSuccessAction
    | RefreshTokenFailureAction;

