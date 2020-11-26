import React from 'react';
import AdvertsPage from '../adverts/AdvertsPage';
import LoginPage from '../auth/LoginPage';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				{/* <AdvertsPage /> */}
				<LoginPage />
			</div>
		);
	}
}

export default App;
