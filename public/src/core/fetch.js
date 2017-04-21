'use strict';
import config from 'config'
import {Promise, polyfill} from 'es6-promise';
polyfill();
import fetch from 'isomorphic-fetch'

export default (url, options = {})=>{
  options = {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    ...options
  };

  const { body } = options;

  if ( !!body ) {
    options.body = JSON.stringify(body);
  }

  const error = (err)=>{

  };

  return fetch(config.api + url, options)
    .then(res=>{
      let contentType = res.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        let json = res.json();
        if (res.status >= 200 && res.status < 300) {
          return json;
        } else {
          return json.then(error);
        }
      } else {
        console.log("Oops, we haven't got JSON!");
      }
    })
    .then(data=>{
      const {status, message} = data;
      if (status === 'fail') {
        return Promise.reject({status, message});
      }
      return Promise.resolve(data);
    })
    .catch(error)

}