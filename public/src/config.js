module.exports = ((env)=>{
  const config = require('./config/' + env + '.js');
  return {
    env: env,
    ...config.default
  }
})(process.env.NODE_ENV || 'development');