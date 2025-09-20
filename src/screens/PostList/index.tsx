import React, {useCallback, useEffect, useState} from 'react';
import {PostList} from "@/modules/post/components/PostList";
import {useDispatch} from "react-redux";
import {getPostListRequest} from "@/modules/post/store/actions";
import {useHistory, useLocation} from 'react-router-dom';
import {PAGE_QUERY_PARAM_NAME} from "@/modules/post/constants";
import {getPageQuery} from "@/helpers/query";

const PostListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [page, setPage] = useState<number>(getPageQuery(location.search));

    const handlePageChange = useCallback((page: number) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(PAGE_QUERY_PARAM_NAME, String(page));

        history.push({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    }, [history, location])

    useEffect(() => {
        const page = getPageQuery(location.search);

        if (page) {
            setPage(Number(page))
        }
    }, [location.search]);

    useEffect(() => {
        dispatch(getPostListRequest(page ?? 1));
    }, [page])

    return <PostList onChangePage={handlePageChange} />
};

export default PostListScreen;