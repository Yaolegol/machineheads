import React, {useCallback, useEffect, useState} from 'react';
import {PostList} from "@/modules/post/components/PostList";
import {useDispatch} from "react-redux";
import {getPostListRequest} from "@/modules/post/store/actions";
import {useHistory, useLocation} from 'react-router-dom';
import {PAGE_QUERY_PARAM_NAME} from "@/modules/post/constants";

const PostListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [page, setPage] = useState(1);

    const handlePageChange = useCallback((page: number) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(PAGE_QUERY_PARAM_NAME, String(page));

        history.push({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    }, [history, location])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get(PAGE_QUERY_PARAM_NAME);

        if (page) {
            setPage(Number(page))
        }
    }, [location.search]);

    useEffect(() => {
        dispatch(getPostListRequest(page));
    }, [page])

    return <PostList onChangePage={handlePageChange} />
};

export default PostListScreen;