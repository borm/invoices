import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'core/middleware/promise'
import rootReducer from '../reducers'

export default (initialState = {})=>{
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(promise, thunk)
  )
}
