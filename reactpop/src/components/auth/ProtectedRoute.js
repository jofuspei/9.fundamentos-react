import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ logged, ...props }) =>
	logged ? <Route {...props}></Route> : <Redirect to="/login" />;

export default ProtectedRoute;
