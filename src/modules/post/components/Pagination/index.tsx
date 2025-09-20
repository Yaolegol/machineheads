import React, {FC} from 'react';
import {useSelectPagination} from "@/modules/post/store/selectors";
import {Pagination as PaginationAntd} from "antd";

interface IProps {
    onChangePage: (page: number) => void;
}

export const Pagination: FC<IProps> = ({onChangePage}) => {
    const pagination = useSelectPagination();

    if(!pagination) {
        return null;
    }

    const {current, pageSize, total} = pagination;

    return (
        <PaginationAntd
            style={{ marginTop: 16 }}
            current={current}
            pageSize={pageSize}
            total={total}
            showTotal={(t, range) => `${range[0]}-${range[1]} из ${t}`}
            onChange={onChangePage}
        />
    )
};