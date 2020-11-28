import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';

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
	<div
		className={classNames('advert', className)}
		onClick={() => history.push(`/advert/${_id}`)}
	>
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
	_id: T.string.isRequired,
	className: T.string,
	photo: T.string,
	name: T.string.isRequired,
	sale: T.bool,
	price: T.number,
	tags: T.array,
};

export default Advert;
