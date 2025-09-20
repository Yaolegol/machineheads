import {POST_LIST_FAILURE, POST_LIST_REQUEST, POST_LIST_SUCCESS} from "@/modules/post/store/constants";
import {PostActionTypes} from "@/modules/post/store/types";
import {IPost} from "@/modules/post/types";

export interface AuthState {
    postList: IPost[];
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    postList: [],
    loading: false,
    error: null,
};

export const postReducer = (state = initialState, action: PostActionTypes): AuthState => {
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
                postList: [
                    ...action.payload.list
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