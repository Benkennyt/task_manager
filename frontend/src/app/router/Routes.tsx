import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import RequiredAuth from "./RequiredAuth";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import RegistrationForm from "../../features/authentication/register/RegistrationForm";
import LoginForm from "../../features/authentication/login/LoginForm";
import Home from "../../features/home/Home";
import App from "../layout/App";
import Settings from "../../features/settings/Settings";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequiredAuth/>,
                children: [
                    {path: 'home', element: <Home/>},
                    {path: 'settings', element: <Settings/>}
                ]
            },
            {path: 'sign-up', element: <RegistrationForm />},
            {path: 'sign-in', element: <LoginForm />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]

export const router = createBrowserRouter(routes);