import React from 'react';
import classNames from 'classnames';
import { Item, Label } from 'semantic-ui-react';

import './Advert.css';

const Advert = ({
	className,
	photo,
	name,
	sale,
	price,
	tags,
	history,
	_id,
}) => (
	<Item
		className={classNames('advert', className)}
		onClick={() => history.push(`/advert/${_id}`)}
	>
		<Item.Image
			className="advert__photo"
			src="https://react.semantic-ui.com/images/wireframe/image.png"
		/>

		<Item.Content className="advert__content">
			<Item.Header>{name}</Item.Header>
			<Item.Meta>
				<span
					className={classNames(
						`advert__${sale ? 'sell' : 'buy'}`,
						'advert__sale',
					)}
				>
					{sale ? 'Sell' : 'Buy'}
				</span>
			</Item.Meta>
			<Item.Description>
				<span className="advert__price">{`${price} €`}</span>
			</Item.Description>
			<Item.Extra>
				{tags.map((tag) => (
					<Label key={tag}>{tag}</Label>
				))}
			</Item.Extra>
		</Item.Content>
	</Item>

	// <div
	// 	className={classNames('advert', className)}
	// 	onClick={() => history.push(`/advert/${_id}`)}
	// >
	// 	<div>
	// 		<img src={photo} alt={name} />
	// 	</div>
	// 	<div>
	// 		<span>{name}</span>
	// 	</div>
	// 	{tags && (
	// 		<div>
	// 			{tags.map((tag) => (
	// 				<span key={tag}>{tag}</span>
	// 			))}
	// 		</div>
	// 	)}
	// 	<div>
	// 		<span>{sale ? 'SALE' : 'BUY'}</span>
	// 		<span>{price}</span>
	// 	</div>
	// </div>
);

export default Advert;
