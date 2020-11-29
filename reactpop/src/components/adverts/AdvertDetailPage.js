import React from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';

import Layout from '../layout/Layout';
import { Button, Item, Label, Icon, Message } from 'semantic-ui-react';

import { getAddDetail, deleteAdvert } from '../../api/adds';

import './AdvertDetailPage.css';

class AdvertDetailPage extends React.Component {
	state = {
		add: null,
		error: null,
		deletionError: null,
	};

	componentDidMount() {
		this.getAddDetail();
	}

	getAddDetail = () => {
		const { id } = this.props.match.params;
		getAddDetail(id)
			.then((add) => {
				this.setState({ add });
			})
			.catch((error) => this.setState({ error }));
	};

	handleDelete = (ev, data) => {
		const { id: addId } = this.props.match.params;
		const { history } = this.props;

		deleteAdvert(addId)
			.then((res) => {
				if (res.ok) {
					history.push('/adverts');
				} else {
					throw new Error('An error ocurred. Please try again.');
				}
			})
			.catch((error) => this.setState({ deletionError: error }));
	};

	renderContent = () => {
		const { add, error, deletionError } = this.state;

		if (error) {
			return <Redirect to="/404" />;
		}

		if (!add) {
			return null;
		}

		const {
			result: { _id, name, sale, price, tags, photo },
		} = add;

		return (
			<Item className="advertDetail">
				<Item.Header className="advertDetail__name">{name}</Item.Header>
				<Item.Image
					className="advertDetail__photo"
					src={
						photo
							? `${process.env.REACT_APP_API_BASE_URL}${photo}`
							: 'https://react.semantic-ui.com/images/wireframe/image.png'
					}
				/>
				<Item.Content className="advertDetail__content">
					<div>
						{tags.map((tag) => (
							<Label key={`${_id}__${tag}`}>{tag}</Label>
						))}
					</div>
					<div>
						<span
							className={classNames(
								`advertDetail__${sale ? 'sell' : 'buy'}`,
								'advertDetail__sale',
							)}
						>
							{sale ? 'Sell' : 'Buy'}
						</span>
						<span
							className={classNames(
								`advertDetail__${sale ? 'sell' : 'buy'}`,
								'advertDetail__price',
							)}
						>{`${price} €`}</span>
					</div>
				</Item.Content>
				<Button color="red" fluid onClick={this.handleDelete}>
					<Icon name="trash"></Icon>Eliminar
				</Button>
				{deletionError && (
					<Message color="red">
						<Message.Header>An error occurred</Message.Header>
						<p>{deletionError.message}</p>
					</Message>
				)}
			</Item>
		);
	};

	render() {
		return (
			<Layout>
				<div>{this.renderContent()}</div>
			</Layout>
		);
	}
}

export default AdvertDetailPage;
