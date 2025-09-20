import React, {FC} from 'react';
import { Provider } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { AppRouter } from '@/core/router';
import {AuthModule} from "@/modules/auth/store/module";
import {createAppStore} from "@/core/store";
import {PostModule} from "@/modules/post/store/module";

const store = createAppStore();

const App: FC = () => {
    return (
        <Provider store={store}>
            <DynamicModuleLoader modules={[AuthModule, PostModule]}>
                <AppRouter />
            </DynamicModuleLoader>
        </Provider>
    );
};

export default App;