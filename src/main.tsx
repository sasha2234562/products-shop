import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import {Provider} from "react-redux";
import {store} from "./bll/redux/store.ts";
import {AppRouter} from "../app-router.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </React.StrictMode>
);
