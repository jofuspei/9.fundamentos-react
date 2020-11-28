import client from './client';

const baseApiUrl = '/apiv1';

export const getAdds = () => {
	const url = `${baseApiUrl}/adverts`;
	return client.get(url);
};

export const getAddDetail = (addId) => {
	const url = `${baseApiUrl}/adverts/${addId}`;
	return client.get(url);
};
