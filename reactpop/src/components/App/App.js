import React from 'react';
import T from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

import AdvertsPage from '../adverts/AdvertsPage';
import LoginPage from '../auth/LoginPage';
import AdvertDetailPage from '../adverts/AdvertDetailPage';
import NewAdvertPage from '../adverts/NewAdvertPage';
import ProtectedRoute from '../auth/ProtectedRoute';
import NotFoundPage from '../shared/NotFoundPage';

class App extends React.Component {
	state = {
		logged: this.props.initiallyLogged,
	};

	handleLogin = (logged, cb) => this.setState({ logged }, cb);
	handleLogout = () => this.setState({ logged: false });

	render() {
		const { logged } = this.state;
		return (
			<AuthContext.Provider
				value={{
					logged,
					onLogin: this.handleLogin,
					onLogout: this.handleLogout,
				}}
			>
				<div className="App">
					<Switch>
						<ProtectedRoute path="/" exact>
							<Redirect to="/adverts" />
						</ProtectedRoute>
						<ProtectedRoute path="/adverts" exact>
							{({ history }) => <AdvertsPage history={history} />}
						</ProtectedRoute>
						<ProtectedRoute path="/advert/new" exact>
							{({ history }) => <NewAdvertPage history={history} />}
						</ProtectedRoute>
						<ProtectedRoute
							path="/advert/:id"
							exact
							component={AdvertDetailPage}
						></ProtectedRoute>
						<Route path="/login" exact>
							{({ history }) => (
								<LoginPage onLogin={this.handleLogin} history={history} />
							)}
						</Route>
						<ProtectedRoute path="/404" exact>
							<NotFoundPage />
						</ProtectedRoute>
						<ProtectedRoute>
							<Redirect to="/404" />
						</ProtectedRoute>
					</Switch>
				</div>
			</AuthContext.Provider>
		);
	}
}

App.propTypes = {
	initiallyLogged: T.bool.isRequired,
};

export default App;
