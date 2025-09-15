import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
} from '@/modules/auth/store/constants';
import {AuthActionTypes} from "@/modules/auth/store/types";

interface AuthState {
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
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