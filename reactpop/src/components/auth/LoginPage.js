import React from 'react';
import T from 'prop-types';
import { Input, Checkbox, Button, Message } from 'semantic-ui-react';
import { login } from '../../api/auth';

import './LoginPage.css';

class LoginPage extends React.Component {
	state = {
		form: {
			email: '',
			password: '',
			remember: false,
		},
		loading: false,
		error: null,
	};

	handleChange = (ev, data) => {
		this.setState((state) => ({
			form: {
				...state.form,
				[data.name]: data.value || data.checked,
			},
			error: null,
		}));
	};

	handleSubmit = async (ev) => {
		const { onLogin, history } = this.props;
		const { form: credentials } = this.state;
		ev.preventDefault();
		this.setState({ loading: true });
		try {
			const result = await login(credentials);
			const error = result.ok ? null : { message: result.error };
			setTimeout(() => {
				// Simulate some loading time
				this.setState({ loading: false, error });
				onLogin(result.ok, () => {
					history.push('/adverts');
				});
			}, 1000);
		} catch (error) {
			this.setState({ loading: false, error });
		}
	};

	canSubmit = () => {
		const {
			form: { email, password },
			loading,
		} = this.state;

		return email && password && !loading;
	};

	render() {
		const {
			form: { email, password, remember },
			loading,
			error,
		} = this.state;

		return (
			<div className="loginPage">
				<h1 className="loginPage__title">Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="email"
						type="text"
						value={email}
						className="loginForm__input"
						onChange={this.handleChange}
						icon="mail"
						iconPosition="left"
						placeholder="email"
					/>

					<Input
						name="password"
						type="password"
						value={password}
						className="loginForm__input"
						onChange={this.handleChange}
						icon="lock"
						iconPosition="left"
						placeholder="password"
					/>

					<Checkbox
						name="remember"
						checked={remember}
						className="loginForm__checkbox"
						onChange={this.handleChange}
						label="Remember me"
					/>

					<Button
						type="submit"
						className="loginForm__button"
						primary
						loading={loading}
						disabled={!this.canSubmit()}
					>
						Log in
					</Button>
					{error && (
						<Message color="red" className="loginPage__error">
							<Message.Header>An error occurred</Message.Header>
							<p>{error.message}</p>
						</Message>
					)}
				</form>
			</div>
		);
	}
}

LoginPage.propTypes = {
	onLogin: T.func.isRequired,
};

export default LoginPage;
