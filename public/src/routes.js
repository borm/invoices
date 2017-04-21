import { Route, IndexRoute } from 'react-router'

import {
	App,
  Products,
  Customers,
	Invoices
} from 'containers'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Invoices}/>

		<Route path={'products'} component={Products}/>
		<Route path={'customers'} component={Customers}/>
		<Route path={'invoices'} component={Invoices}/>
	</Route>
);