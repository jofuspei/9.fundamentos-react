import React from 'react';
import T from 'prop-types';

import classNames from 'classnames';

const Header = ({ className }) => (
	<header className={classNames('header', className)}>
		<div className="header--logo"></div>
		<nav className="header--nav"></nav>
	</header>
);

Header.propTypes = {
	className: T.string,
};

export default Header;
