import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import { logout } from '../../api/auth';
import { AuthContext } from '../contexts/AuthContext';

import './Header.css';

const Header = ({ className, onLogout }) => (
	<header className={classNames('header', className)}>
		<Link to="/">
			<div className="header__logo">
				<Icon circular inverted color="blue" size="big" name="dollar" />
				<h1>Nodepop</h1>
			</div>
		</Link>
		<nav className="header__nav">
			<React.Fragment>
				<Link to="/advert/new">
					<Button primary>New product</Button>
				</Link>
				<Button basic color="red" onClick={() => logout().then(onLogout)}>
					Logout
				</Button>
			</React.Fragment>
		</nav>
	</header>
);

Header.propTypes = {
	className: T.string,
	onLogout: T.func,
	logged: T.bool,
};

const AuthHeader = (props) => (
	<AuthContext.Consumer>
		{(value) => <Header {...props} {...value} />}
	</AuthContext.Consumer>
);

export default AuthHeader;
