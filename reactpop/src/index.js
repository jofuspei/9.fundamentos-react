import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import storage from './utils/storage';

import App from './components/App';
import { configureClient } from './api/client';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

const auth = storage.get('auth') || { ok: false, token: null };
configureClient(auth.token);

ReactDOM.render(
	<BrowserRouter>
		<App initiallyLogged={auth.ok} />
	</BrowserRouter>,
	document.getElementById('root'),
);
