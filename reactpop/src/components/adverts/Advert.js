import React from 'react';
import classNames from 'classnames';

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

export default Advert;
