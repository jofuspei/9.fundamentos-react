import client from './client';

export const login = (credentials) =>
	client.login(credentials).then((auth) => auth);
