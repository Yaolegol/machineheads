import {POST_LIST_FAILURE, POST_LIST_REQUEST, POST_LIST_SUCCESS} from "@/modules/post/store/constants";
import {IPagination, IPost} from "@/modules/post/types";

export const getPostListRequest = (page: number) => ({
    payload: {
        page,
    },
    type: POST_LIST_REQUEST,
});

export const getPostListSuccess = (list: IPost[], pagination: IPagination) => ({
    payload: {
        list,
        pagination,
    },
    type: POST_LIST_SUCCESS,
});

export const getPostListFailure = (error: string) => ({
    type: POST_LIST_FAILURE,
    payload: error,
});