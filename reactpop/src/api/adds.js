import client from './client';

const baseApiUrl = '/apiv1';

export const getAdds = () => {
	const url = `${baseApiUrl}/adverts`;
	return client.get(url);
};
