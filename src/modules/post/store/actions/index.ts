import {POST_LIST_FAILURE, POST_LIST_REQUEST, POST_LIST_SUCCESS} from "@/modules/post/store/constants";
import {IPost} from "@/modules/post/types";

export const getPostListRequest = () => ({
    type: POST_LIST_REQUEST,
});

export const getPostListSuccess = (list: IPost[]) => ({
    payload: {
        list
    },
    type: POST_LIST_SUCCESS,
});

export const getPostListFailure = (error: string) => ({
    type: POST_LIST_FAILURE,
    payload: error,
});