import {POST_LIST_FAILURE, POST_LIST_REQUEST, POST_LIST_SUCCESS} from "@/modules/post/store/constants";
import {PostActionTypes} from "@/modules/post/store/types";
import {IPagination, IPost} from "@/modules/post/types";

export interface PostState {
    pagination: IPagination | null;
    postList: IPost[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    pagination: null,
    postList: [],
    loading: false,
    error: null,
};

export const postReducer = (state = initialState, action: PostActionTypes): PostState => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case POST_LIST_SUCCESS:
            return {
                ...state,
                pagination: {
                  ...action.payload.pagination
                },
                postList: [
                    ...action.payload.list,
                ],
                loading: false,
                error: null,
            };
        case POST_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};