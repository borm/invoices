import { createReducer, getActionIds } from 'core/redux';
import actions from './actions';
import Products from './model';

export default createReducer({
  list: new Products()
}, ((products)=>{
  return {

    [products.list.success]: (state, action) => {
      return {...state, list: new Products({storage: action.result})};
    },

    [products.list.failed]: (state) => {
      return new Products();
    },

  }
})(getActionIds(actions)));