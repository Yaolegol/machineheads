import React, {FC} from 'react';
import {useSelectPostList} from "@/modules/post/store/selectors";
import {List} from "antd";
import {Pagination} from "@/modules/post/components/Pagination";
import {PostItem} from "@/modules/post/components/PostItem";

interface IProps {
    onChangePage: (page: number) => void;
}

export const PostList: FC<IProps> = ({onChangePage}) => {
    const postList = useSelectPostList();

    if(!postList.length) {
        return null;
    }

    return (
        <div>
            <List
                dataSource={postList}
                renderItem={(item) => {
                    return <PostItem post={item} />
                }}
            />
            <Pagination onChangePage={onChangePage} />
        </div>
    )
};