import {authReducer} from "@/modules/auth/store/reducers";
import {authSaga} from "@/modules/auth/store/sagas";

export const AuthModule = {
    id: 'auth',
    reducerMap: {
        auth: authReducer,
    },
    sagas: [authSaga],
};