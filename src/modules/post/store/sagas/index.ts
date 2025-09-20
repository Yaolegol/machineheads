import { call, put, takeEvery } from 'redux-saga/effects';
import {ApiResponse} from '@/core/api';
import {POST_LIST_REQUEST} from "@/modules/post/store/constants";
import {getPostListService} from "@/modules/post/services";
import {getPostListFailure, getPostListSuccess} from "@/modules/post/store/actions";
import {TGetPostListResponse} from "@/modules/post/types";

function* getPostListSaga() {
    try {
        const response: ApiResponse<TGetPostListResponse> = yield call(getPostListService);

        yield put(getPostListSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        yield put(getPostListFailure(error.message));
    }
}

export function* postSaga() {
    yield takeEvery(POST_LIST_REQUEST, getPostListSaga);
}
