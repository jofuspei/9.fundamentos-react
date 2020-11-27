import React from 'react';
import T from 'prop-types';
import AdvertsPage from '../adverts/AdvertsPage';
import LoginPage from '../auth/LoginPage';

class App extends React.Component {
	state = {
		logged: this.props.initiallyLogged,
	};

	handleLogin = (logged) => this.setState({ logged });

	render() {
		const { logged } = this.state;
		return (
			<div className="App">
				{logged ? <AdvertsPage /> : <LoginPage onLogin={this.handleLogin} />}
			</div>
		);
	}
}

App.propTypes = {
	initiallyLogged: T.bool.isRequired,
};

export default App;
