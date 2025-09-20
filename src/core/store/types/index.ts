import {AuthState} from "@/modules/auth/store/reducers";
import {PostState} from "@/modules/post/store/reducers";

export interface RootState {
    auth: AuthState;
    post: PostState;
}