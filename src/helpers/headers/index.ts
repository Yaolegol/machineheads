import {IPagination} from "@/modules/post/types";

export const getPaginationFromHeaders = (headers: Headers): IPagination => {
    const getHeaderValue = (name: string): number => {
        const value = headers.get(name);

        return value ? Number(value) : 0;
    };

    return {
        current: getHeaderValue('x-pagination-current-page'),
        pageCount: getHeaderValue('x-pagination-page-count'),
        pageSize: getHeaderValue('x-pagination-per-page'),
        total: getHeaderValue('x-pagination-total-count'),
    };
};