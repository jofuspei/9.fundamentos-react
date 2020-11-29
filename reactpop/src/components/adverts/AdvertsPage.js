import React from 'react';

import Layout from '../layout/Layout';
import Advert from './Advert';
import AdvertFilter from './AdvertFilter';
import { Divider } from 'semantic-ui-react';

import { getAdds, getFilteredAdds } from '../../api/adds';

class AdvertsPage extends React.Component {
	state = {
		adds: null,
		filters: null,
	};

	componentDidMount() {
		this.getAdvertsData();
	}

	async getAdvertsData() {
		const result = await getAdds();
		this.setState({ adds: result.result.rows });
	}

	async getFilteredAdvertsData() {
		const {
			filters: { name, sale, price, tags },
		} = this.state;
		const query = {};
		if (name) {
			query.name = name;
		}
		if (sale === 'sell') {
			query.sale = true;
		} else if (sale === 'buy') {
			query.sale = false;
		}
		query.price = `${price.low}-${price.up}`;
		if (tags.length) {
			query.tags = tags;
		}

		const result = await getFilteredAdds(query);
		this.setState({ adds: result.result.rows });
	}

	updateFilters = (filters) => {
		this.setState({ filters }, () => {
			this.getFilteredAdvertsData();
		});
	};

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
		const { filters } = this.state;
		return (
			<Layout title="Adverts" {...this.props}>
				<div className="advertsPage__filter">
					<AdvertFilter updateFilters={this.updateFilters} />
				</div>
				<Divider />
				<div className="advertsPage__content">{this.renderContent()}</div>
			</Layout>
		);
	}
}

export default AdvertsPage;
