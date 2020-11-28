import React from 'react';

import Layout from '../layout/Layout';

import { getAddDetail } from '../../api/adds';
import { Redirect } from 'react-router-dom';

class AdvertDetailPage extends React.Component {
	state = {
		add: null,
		error: null,
	};

	getAddDetail = () => {
		const { id } = this.props.match.params;
		getAddDetail(id)
			.then((add) => {
				this.setState({ add });
			})
			.catch((error) => this.setState({ error }));
	};

	componentDidMount() {
		this.getAddDetail();
	}

	renderContent = () => {
		const { add, error } = this.state;
		if (error) {
			return <Redirect to="/404" />;
		}
		if (!add) {
			return null;
		}
		return JSON.stringify(add);
	};

	render() {
		return (
			<Layout title="Add detail">
				<div>{this.renderContent()}</div>
			</Layout>
		);
	}
}

export default AdvertDetailPage;
