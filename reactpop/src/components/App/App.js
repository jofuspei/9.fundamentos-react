import React from 'react';
import T from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdvertsPage from '../adverts/AdvertsPage';
import LoginPage from '../auth/LoginPage';
import AdvertDetailPage from '../adverts/AdvertDetailPage';
import NewAdvertPage from '../adverts/NewAdvertPage';
import ProtectedRoute from '../auth/ProtectedRoute';

class App extends React.Component {
	state = {
		logged: this.props.initiallyLogged,
	};

	handleLogin = (logged, cb) => this.setState({ logged }, cb);
	handleLogout = () => this.setState({ logged: false });

	render() {
		const { logged } = this.state;
		return (
			<div className="App">
				<Switch>
					<ProtectedRoute logged={logged} path="/" exact>
						<Redirect to="/adverts" />
					</ProtectedRoute>
					<ProtectedRoute logged={logged} path="/adverts" exact>
						{({ history }) => (
							<AdvertsPage
								history={history}
								isLogged={logged}
								onLogout={this.handleLogout}
							/>
						)}
					</ProtectedRoute>
					<ProtectedRoute logged={logged} path="/advert/new" exact>
						<NewAdvertPage></NewAdvertPage>
					</ProtectedRoute>
					<ProtectedRoute
						logged={logged}
						path="/advert/:id"
						exact
						component={AdvertDetailPage}
					></ProtectedRoute>
					<Route path="/login" exact>
						{({ history }) => (
							<LoginPage onLogin={this.handleLogin} history={history} />
						)}
					</Route>
					<ProtectedRoute logged={logged} path="/404" exact>
						404
					</ProtectedRoute>
					<ProtectedRoute logged={logged}>
						<Redirect to="/404" />
					</ProtectedRoute>
				</Switch>
			</div>

			// <div className="App">
			// 	{logged ? <AdvertsPage /> : <LoginPage onLogin={this.handleLogin} />}
			// </div>
		);
	}
}

App.propTypes = {
	initiallyLogged: T.bool.isRequired,
};

export default App;
