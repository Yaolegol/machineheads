import {PAGE_QUERY_PARAM_NAME} from "@/modules/post/constants";

export const getPageQuery = (search: string) => {
    const searchParams = new URLSearchParams(search);
    const page = searchParams.get(PAGE_QUERY_PARAM_NAME);

    return Number(page) || 1;
}
