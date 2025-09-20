import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {PostList} from "@/modules/post/components/PostList";
import {useDispatch} from "react-redux";
import {getPostListRequest} from "@/modules/post/store/actions";
import {useHistory, useLocation, useParams} from 'react-router-dom';

const PostListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [page, setPage] = useState(1);

    const handlePageChange = useCallback((page: number) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', String(page));

        history.push({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    }, [history, location])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page');

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