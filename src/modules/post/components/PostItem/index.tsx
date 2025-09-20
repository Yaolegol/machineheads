import React, {FC} from 'react';
import {IPost} from "@/modules/post/types";
import { List } from "antd";

interface IProps {
    post: IPost;
}

export const PostItem: FC<IProps> = ({post}) => {
    return (
        <List.Item>{post.title}</List.Item>
    )
};