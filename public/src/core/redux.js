import map from 'lodash.map';
import mapValues from 'lodash.mapvalues';

// Create actions that don't need constants :)
export const createActions = (prefix, actionObj) => {
  //const baseId = uniqueId();

  const zipObject = {};

  map(actionObj, (actionCreator, key) => {
    const actionId = `${prefix.toUpperCase()}__${key.toUpperCase()}`;

    const asyncTypes = ['BEGIN', 'PROGRESS', 'SUCCESS', 'FAILED'].reduce((types, type) => {
      types[type.toLowerCase()] = `${actionId}_${type}`;
      return types;
    }, {});

    let method = (...args)=>{
      const result = actionCreator.call({
        _id: actionId,
        _types: asyncTypes
      }, ...args);

      const [params] = args;

      if (result instanceof Promise) {
        // Promise (async)
        return {
          //types: {[prefix]: asyncTypes},
          prefix,
          name: key,
          types: asyncTypes,
          promise: result,
          params
        };
      } else if (typeof result === 'function') {
        // Function (async)
        return (...args) => {
          const [dispatch] = args;

          const child = (result(...args) || {});
          if (dispatch && child instanceof Promise) {
            // Promise (async)
            return dispatch({
              prefix,
              name: key,
              types: asyncTypes,
              promise: child,
              params
            });
          }
          return {
            type: actionId,
            result: child
          };
        };
      } else {
        // Object (sync)
        return {
          type: actionId,
          result: result || {}
        };
      }
    };

    if (actionCreator._async === true) {
      method._id = asyncTypes;
    } else {
      method._id = actionId;
    }

    zipObject[key] = method;
  });

  return zipObject;
};

export function asyncAction() {
  return (target, name, descriptor) => {
    descriptor.value._async = true;
    return descriptor;
  };
}

// Get action ids from actions created with `createActions`
export const getActionIds = (actionCreators) => {
  return mapValues(actionCreators, (value, key) => {
    return value._id;
  });
};

// Replace switch statements in stores (taken from the Redux README)
export const createReducer = (initialState, handlers) => {
  return (
      state = initialState,
      action = {}
    ) => {
    state.waiting = {};
    const {name, type, error} = action;
    const reducer = handlers[type];

    if ( name && Object.keys(handlers).indexOf(type) !== -1 ) {
      state = {
        ...state,
        waiting: {
          ...state.waiting,
          [name]: !!(action.waiting)
        }
      }
    }

    if ( error ) {
      //state.isAuth = false;
    }

    return reducer
      ? reducer(state, action)
      : state;
  }
};

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}