import React from 'react';

import Layout from '../layout/Layout';
import Advert from './Advert';

import { getAdds } from '../../api/adds';

class AdvertsPage extends React.Component {
	state = {
		adds: null,
	};

	componentDidMount() {
		this.getAdvertsData();
	}

	async getAdvertsData() {
		const result = await getAdds();
		this.setState({ adds: result.result.rows });
	}

	renderContent() {
		const { history } = this.props;
		const { adds } = this.state;

		if (!adds?.length) {
			return (
				<div>
					<h3>No adds were found</h3>
				</div>
			);
		}

		return adds.map((add) => (
			<Advert {...add} key={add._id} history={history} />
		));
	}

	render() {
		return (
			<Layout title="Adverts" {...this.props}>
				<div className="advertsPage">{this.renderContent()}</div>
			</Layout>
		);
	}
}

export default AdvertsPage;
