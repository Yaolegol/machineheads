import {useSelector} from "react-redux";
import {RootState} from "@/core/store/types";

export const useSelectPagination = () => {
    return useSelector((state: RootState) => state.post.pagination)
}

export const useSelectPostList = () => {
    return useSelector((state: RootState) => state.post.postList)
}