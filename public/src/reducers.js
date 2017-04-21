import { combineReducers } from 'redux'
import products from 'modules/products/reducers'
import customers from 'modules/customers/reducers'
import invoices from 'modules/invoices/reducers'

export default combineReducers({
  products,
  customers,
  invoices
});