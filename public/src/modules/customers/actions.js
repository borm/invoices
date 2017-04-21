import { createActions, asyncAction, delay } from 'core/redux';
import Service from './service'

export default createActions('customers',{

  @asyncAction()
  list(params={
    id: undefined
  }) {
    return delay(500).then(()=>Service.list(params));
  },

  put({id}){
    return {id, key, params};
  },

  remove(id){
    return {id};
  }

});