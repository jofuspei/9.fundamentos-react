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
		const { adds } = this.state;

		if (!adds) {
			return null;
		}

		return adds.map((add) => <Advert {...add} key={add._id} />);
	}

	render() {
		return (
			<Layout title="Adverts">
				<div className="advertsPage">{this.renderContent()}</div>
			</Layout>
		);
	}
}

export default AdvertsPage;
