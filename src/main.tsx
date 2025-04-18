import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import {Provider} from "react-redux";
import {store} from "./api/store.ts";
import {AppRouter} from "../app-router.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <Provider store={store}>
            <AppRouter />
        </Provider>
);
