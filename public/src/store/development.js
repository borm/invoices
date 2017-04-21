import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'core/middleware/promise'
import rootReducer from '../reducers'
import DevTools from 'components/DevTools'

export default (initialState = {})=>{
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(promise, thunk),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
