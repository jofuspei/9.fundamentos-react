import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import Layout from '../layout/Layout';

import './NotFoundPage.css';

class NotFoundPage extends React.Component {
	render() {
		return (
			<Layout>
				<div className="notFoundPage__container">
					<div className="notFoundPage__text">
						<h1>404</h1>
						<h3>It seems you got lost</h3>
					</div>

					<Link to="/">
						<Button primary>Go back to home</Button>
					</Link>
				</div>
			</Layout>
		);
	}
}

export default NotFoundPage;
