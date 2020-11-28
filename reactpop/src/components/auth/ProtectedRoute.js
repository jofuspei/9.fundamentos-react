import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ logged, ...props }) => {
	return logged ? <Route {...props}></Route> : <Redirect to="/login" />;
};

const AuthProtectedRoute = (props) => (
	<AuthContext.Consumer>
		{({ logged }) => {
			return <ProtectedRoute {...props} logged={logged} />;
		}}
	</AuthContext.Consumer>
);

export default AuthProtectedRoute;
