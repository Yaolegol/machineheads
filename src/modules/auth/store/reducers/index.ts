import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE, INIT_AUTH, INIT_AUTH_SUCCESS, INIT_AUTH_FAILURE,
} from '@/modules/auth/store/constants';
import {AuthActionTypes} from "@/modules/auth/store/types";

export interface AuthState {
    isAuthInit: boolean;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthInit: false,
    isLoggedIn: false,
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case INIT_AUTH:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case INIT_AUTH_SUCCESS:
            return {
                ...state,
                error: null,
                isAuthInit: true,
                isLoggedIn: action.payload,
                loading: false,
            };
        case INIT_AUTH_FAILURE:
            return {
                ...state,
                error: action.payload,
                isAuthInit: true,
                loading: false,
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
            };
        default:
            return state;
    }
};