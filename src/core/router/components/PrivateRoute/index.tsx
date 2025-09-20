import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/core/store/types";
import {Redirect, useLocation} from "react-router-dom";

interface IProps {
    children: ReactElement;
}

export const PrivateRoute: FC<IProps> = ({ children }) => {
    const isAuthInit = useSelector((state: RootState) => state.auth.isAuthInit);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const location = useLocation();

    if(!isAuthInit) {
        return null;
    }

    if (!isLoggedIn) {
        return <Redirect to="/" from={location.pathname} />;
    }

    return children;
};