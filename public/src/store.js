import config from './config'
module.exports = ((env)=>{
	return require('./store/' + env + '.js');
})(config.env);