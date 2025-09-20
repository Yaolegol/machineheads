import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/core/store/types";
import {Redirect, useLocation} from "react-router-dom";
import {useIsAuthInit, useIsLoggedIn} from "@/modules/auth/store/selectors";

interface IProps {
    children: ReactElement;
}

export const PrivateRoute: FC<IProps> = ({ children }) => {
    const isAuthInit = useIsAuthInit();
    const isLoggedIn = useIsLoggedIn();
    const location = useLocation();

    if(!isAuthInit) {
        return null;
    }

    if (!isLoggedIn) {
        return <Redirect to="/" from={location.pathname} />;
    }

    return children;
};