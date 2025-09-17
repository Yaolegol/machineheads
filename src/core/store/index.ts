import { createStore, IModuleStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export function createAppStore() {
    const store = createStore({
        extensions: [getSagaExtension()],
    }) as IModuleStore<any>;

    store.addModule({
        id: "router-core",
        reducerMap: { router: connectRouter(history) }, // именно "router"
        middlewares: [routerMiddleware(history)],
    });

    return store;
}
