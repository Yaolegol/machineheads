import {FC, ReactElement, useEffect} from "react";
import {useDispatch} from "react-redux";
import {initAuth} from "@/modules/auth/store/actions";

interface IProps {
    children: ReactElement;
}

export const InitAuth: FC<IProps> = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initAuth())
    }, [])

    return children
}