import {apiClient} from "@/core/api";

export const getPostListService = async (page: number) => {
    return apiClient.get(`/manage/posts?page=${page}`);
}