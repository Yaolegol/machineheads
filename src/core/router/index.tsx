import React, {FC} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import {PrivateRoute} from "@/core/router/components/PrivateRoute";
import {history} from '@/core/store';

const AuthScreen = React.lazy(() => import('@/screens/Auth'));

export const AppRouter: FC = () => {
    return (
        <React.Suspense fallback={<div>Загрузка...</div>}>
            <BrowserRouter>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" component={AuthScreen} />

                        <Route
                            path="/posts"
                            render={() => (
                                <PrivateRoute>
                                    <AuthScreen />
                                </PrivateRoute>
                            )}
                        />
                    </Switch>
                </ConnectedRouter>
            </BrowserRouter>
        </React.Suspense>
    );
};
