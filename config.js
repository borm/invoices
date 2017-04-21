import path from 'path'

const config = {
	host: '127.0.0.1',
	port: process.env.PORT || 8000,
	env: process.env.NODE_ENV || 'development',
	'public': {
		source: path.join(__dirname, 'public/src'),
		output: path.join(__dirname, 'public')
	}
};

export default config;