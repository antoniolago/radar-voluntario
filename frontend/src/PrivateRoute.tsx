import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthService } from './api/auth';

const PrivateRoute = ({
    redirectPath = '/',
    children,
}) => {
    const { data: user } = AuthService.useGetUser();
    console.log(user);
    if (user== undefined || user.name == undefined) {
        return <Navigate to={redirectPath} replace />;
    }
    return children;
};
export default PrivateRoute;
