import axios from 'axios';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

const client = axios.create({
	baseURL,
});

const baseApiUrl = '/apiv1';

const setAuthorizationHeader = (token) => {
	client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

client.login = (credentials) =>
	client.post(`${baseApiUrl}/auth/login`, credentials).then((auth) => {
		setAuthorizationHeader(auth.token);
		return auth;
	});

client.interceptors.response.use(
	(res) => res.data,
	(error) => {
		if (!error.response) {
			return Promise.reject({ message: error.message });
		}
		return Promise.reject({
			message: error.response.statusText,
			...error.response.data,
		});
	},
);

export default client;
