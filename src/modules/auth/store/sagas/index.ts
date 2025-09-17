import { call, put, takeEvery } from 'redux-saga/effects';
import {apiClient, ApiResponse} from '@/core/api';
import {
    LOGIN_REQUEST,
    REFRESH_TOKEN_REQUEST,
} from '@/modules/auth/store/constants';
import {loginFailure, loginSuccess, refreshTokenSuccess, refreshTokenFailure, refreshTokenRequest, loginRequest, logout} from '@/modules/auth/store/actions';
import {setCookie, removeCookie, getCookie} from '@/helpers/cookie';
import { push } from 'connected-react-router';
import {LoginRequestAction} from "@/modules/auth/store/types";
import {ITokenResponse} from "@/modules/auth/types";
import {loginService} from "@/modules/auth/services";

function* loginSaga(action: LoginRequestAction) {
    try {
        const response: ApiResponse<ITokenResponse> = yield call(loginService, action.payload);
        const { accessToken, access_expired_at, refreshToken, refresh_expired_at } = response.data;

        setCookie('accessToken', accessToken, access_expired_at);
        setCookie('refreshToken', refreshToken, refresh_expired_at);

        yield put(loginSuccess());
        yield put(push('/posts'));
    } catch (error) {
        // @ts-ignore
        yield put(loginFailure(error.message));
    }
}

function* refreshTokenSaga() {
    try {
        const token = getCookie('refreshToken');
        const response: ApiResponse<ITokenResponse> = yield call(apiClient.post, '/auth/token-refresh', { refreshToken: token });
        const { accessToken, access_expired_at, refreshToken, refresh_expired_at } = response.data;

        setCookie('accessToken', accessToken, access_expired_at);
        setCookie('refreshToken', refreshToken, refresh_expired_at);

        yield put(refreshTokenSuccess());
    } catch (error) {
        yield put(refreshTokenFailure());

        removeCookie('accessToken');
        removeCookie('refreshToken');

        yield put(push('/'));
    }
}

export function* authSaga() {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}
