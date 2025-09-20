import {useSelector} from "react-redux";
import {RootState} from "@/core/store/types";

export const useIsAuthInit = () => {
    return useSelector((state: RootState) => state.auth.isAuthInit)
}

export const useIsLoggedIn = () => {
    return useSelector((state: RootState) => state.auth.isLoggedIn)
}