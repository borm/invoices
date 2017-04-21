import { PropTypes, checkProps } from './propTypes'
class Model {
	static propTypes = {};
	static defaultProps = {
    waiting: {}
	};

	constructor(props = {}) {
		const { propTypes, defaultProps } = this.constructor;
		this.props = props = {
			...Model.defaultProps,
			...defaultProps,
			...props
		};
		//this.constructor(props);
		checkProps(props, propTypes);

		Object.keys(props).map((key)=>{
			defaultProps.hasOwnProperty(key) && this.set(key, props[key]);
		});
		return this;
	}

	set(key, value) {
		this[key] = value;
	}

	get(key) {
		return this[key];
	}

}

export default Model;
export {PropTypes};