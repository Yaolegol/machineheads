import {postReducer} from "@/modules/post/store/reducers";
import {postSaga} from "@/modules/post/store/sagas";

export const PostModule = {
    id: 'post',
    reducerMap: {
        post: postReducer,
    },
    sagas: [postSaga],
};