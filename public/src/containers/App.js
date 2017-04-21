import React, {Component} from 'react';
import DevTools from 'components/DevTools'
import config from 'config'

import {
  Header
} from 'components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// Actions
import invoices from 'modules/invoices/actions'
import customers from 'modules/customers/actions'
import products from 'modules/products/actions'

@connect(
  state => ({}),
  dispatch => ({
    invoices: bindActionCreators({
      list: invoices.list,
    }, dispatch),
    customers: bindActionCreators({
      list: customers.list,
    }, dispatch),
    products: bindActionCreators({
      list: products.list,
    }, dispatch)
  })
)
class App extends Component {

  componentDidMount(){
    this.props.invoices.list();
    this.props.customers.list();
    this.props.products.list();
  }

  render() {
    return (
      <div className="app">
        <Header />

        { this.props.children }

        {config.env === 'development' && (
          <div style={{
            fontSize: 14,
            lineHeight: '1.2'
          }}><DevTools /></div>
        )}
      </div>
    )
  }
}

export default App;