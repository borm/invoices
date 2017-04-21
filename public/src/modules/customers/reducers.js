import { createReducer, getActionIds } from 'core/redux';
import actions from './actions';
import Customers from './model';

export default createReducer({
  list: new Customers()
}, ((customers)=>{
  return {

    [customers.list.success]: (state, action) => {
      return {...state, list: new Customers({storage: action.result})};
    },

    [customers.list.failed]: (state) => {
      return new Customers();
    },

  }
})(getActionIds(actions)));