import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';

import './Advert.css';
import AdvertsPage from './AdvertsPage';

const Advert = ({ className, photo, name, sale, price, tags }) => (
	<div className={classNames('advert', className)}>
		<div>
			<img src={photo} alt={name} />
		</div>
		<div>
			<span>{name}</span>
		</div>
		{tags && (
			<div>
				{tags.map((tag) => (
					<span key={tag}>{tag}</span>
				))}
			</div>
		)}
		<div>
			<span>{sale ? 'SALE' : 'BUY'}</span>
			<span>{price}</span>
		</div>
	</div>
);

Advert.propTypes = {
	className: T.string,
	photo: T.string,
	name: T.string.isRequired,
	sale: T.bool,
	price: T.number,
	tags: T.array,
};

export default Advert;
