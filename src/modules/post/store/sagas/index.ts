import { call, put, takeEvery } from 'redux-saga/effects';
import {ApiResponse} from '@/core/api';
import {POST_LIST_REQUEST} from "@/modules/post/store/constants";
import {getPostListService} from "@/modules/post/services";
import {getPostListFailure, getPostListRequest, getPostListSuccess} from "@/modules/post/store/actions";
import {TGetPostListResponse} from "@/modules/post/types";
import {getPaginationFromHeaders} from "@/helpers/headers";

function* getPostListSaga(action: ReturnType<typeof getPostListRequest>) {
    try {
        const apiResponse: ApiResponse<TGetPostListResponse> = yield call(getPostListService, action.payload.page);
        const {data, response} = apiResponse;

        const pagination = getPaginationFromHeaders(response.headers);

        yield put(getPostListSuccess(data, pagination));
    } catch (error) {
        // @ts-ignore
        yield put(getPostListFailure(error.message));
    }
}

export function* postSaga() {
    yield takeEvery(POST_LIST_REQUEST, getPostListSaga);
}
