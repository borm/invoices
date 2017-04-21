import {Promise} from 'es6-promise';

const promise = ({dispatch, getState})=> {
  return next => action => {

    let {promise, types, ...rest} = action;

    if (!promise) {
      return next(action);
    }

    const {begin, success, failed} = types;
    next({...action, ...rest, waiting: true, type: begin, types});
    return promise.then(
      (result) => {
        next({...rest, result, waiting: false, type: success, types});
        return Promise.resolve(result);
      },
      (error) => {
        next({...rest, error, waiting: false, type: failed, types});
        return Promise.reject(error);
      }
    );
  };
};

export default promise;