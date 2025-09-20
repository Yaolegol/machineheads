import { call, put, takeEvery } from 'redux-saga/effects';
import {ApiResponse} from '@/core/api';
import {
    INIT_AUTH,
    LOGIN_REQUEST,
    REFRESH_TOKEN_REQUEST,
} from '@/modules/auth/store/constants';
import {
    loginFailure, loginSuccess, refreshTokenSuccess, refreshTokenFailure,
    initAuthSuccess, initAuthFailure
} from '@/modules/auth/store/actions';
import {getCookie} from '@/helpers/cookie';
import { push } from 'connected-react-router';
import {LoginRequestAction} from "@/modules/auth/store/types";
import {ITokenResponse} from "@/modules/auth/types";
import {loginService, refreshTokenService} from "@/modules/auth/services";
import {clearAuthCookie, updateAuthCookie} from "@/modules/auth/helpers";
import {ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME} from "@/modules/auth/constants";

export function* initAuthSaga() {
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

    if (accessToken) {
        yield put(initAuthSuccess(true));

        return;
    }

    const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_NAME);

    if (refreshToken) {
        try {
            const response: ITokenResponse | null = yield call(refreshTokenService, refreshToken);

            if(response) {
                updateAuthCookie(response);

                yield put(initAuthSuccess(true));
            }

            return;
        } catch (error) {
            clearAuthCookie();

            // @ts-ignore
            yield put(initAuthFailure(error.message));

            return;
        }
    }

    yield put(initAuthSuccess(false));
}

function* loginSaga(action: LoginRequestAction) {
    try {
        const response: ApiResponse<ITokenResponse> = yield call(loginService, action.payload);

        const {data} = response;

        if(data) {
            updateAuthCookie(data);

            yield put(loginSuccess());
            yield put(push('/posts'));
        }
    } catch (error) {
        clearAuthCookie();

        // @ts-ignore
        yield put(loginFailure(error.message));
    }
}

function* refreshTokenSaga() {
    try {
        const token = getCookie(REFRESH_TOKEN_COOKIE_NAME);

        if(!token) {
            yield put(refreshTokenFailure());

            yield put(push('/'));

            return;
        }

        const response: ITokenResponse | null = yield call(refreshTokenService, token);

        if(response) {
            updateAuthCookie(response);

            yield put(refreshTokenSuccess());
        }
    } catch (error) {
        clearAuthCookie();

        yield put(refreshTokenFailure());

        yield put(push('/'));
    }
}

export function* authSaga() {
    yield takeEvery(INIT_AUTH, initAuthSaga);
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}
