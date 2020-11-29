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

export const getTagList = () => {
	const url = `${baseApiUrl}/adverts/tags`;
	return client.get(url);
};

export const newAdvert = (addInfo) => {
	const url = `${baseApiUrl}/adverts`;
	return client.post(url, addInfo);
};

export const deleteAdvert = (addId) => {
	const url = `${baseApiUrl}/adverts/${addId}`;
	return client.delete(url);
};
