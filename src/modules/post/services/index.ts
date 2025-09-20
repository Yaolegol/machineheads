import {apiClient} from "@/core/api";

export const getPostListService = async () => {
    return apiClient.get('/manage/posts');
}