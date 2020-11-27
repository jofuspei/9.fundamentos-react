import client from './client';

import storage from '../utils/storage';

export const login = (credentials) => {
	const { remember, ...creds } = credentials;
	return client.login(creds).then((auth) => {
		if (remember && auth.ok) {
			storage.set('auth', auth);
		}
		return auth;
	});
};
