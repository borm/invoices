import './app.scss'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './store'
const store = configureStore();

import { Router, browserHistory } from 'react-router'
import routes from './routes'

render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>,
	document.getElementById('app')
);