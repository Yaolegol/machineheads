import {POST_LIST_FAILURE, POST_LIST_REQUEST, POST_LIST_SUCCESS} from "@/modules/post/store/constants";
import {IPagination, IPost} from "@/modules/post/types";

export interface GetPostListRequestAction {
    type: typeof POST_LIST_REQUEST;
}

export interface GetPostListSuccessAction {
    type: typeof POST_LIST_SUCCESS;
    payload: {
        list: IPost[],
        pagination: IPagination;
    };
}

export interface GetPostListFailureAction {
    type: typeof POST_LIST_FAILURE;
    payload: string;
}

export type PostActionTypes =
    | GetPostListRequestAction
    | GetPostListSuccessAction
    | GetPostListFailureAction;

