import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/core/store/types";
import {Redirect, useLocation} from "react-router-dom";

interface IProps {
    children: ReactElement;
}

export const PrivateRoute: FC<IProps> = ({ children }) => {
    const isAuth = useSelector((state: RootState) => state.auth.isLoggedIn);
    const location = useLocation();

    if (!isAuth) {
        return <Redirect to="/" from={location.pathname} />;
    }

    return children;
};