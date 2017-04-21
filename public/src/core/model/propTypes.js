class Validator {

  constructor(props){
    return {
      ...props,
      required: false,
      isRequired: {
        ...props,
        required: true
      }
    }
  }

  static bool(bool){
    return typeof bool === 'boolean'
  }

  static number(number){
    return typeof number === 'number'
  }

  static isNull(value){
    return value === null
  }

  static string(string){
    return typeof string === 'string'
  }

  static array(array){
    return array instanceof Array;
  }

  static object(object){
    return typeof object === 'object' && !(Validator.array(object));
  }

  static oneOf(prop) {
    return this.indexOf(prop) !== -1
  }

  static oneOfType(prop) {
    let isValid = false;
    this.forEach(rule=>{
      if ( rule.validator(prop) ) {
        isValid = true;
        return isValid;
      }
    });
    return isValid;
  }

}

const PropTypes = {
	bool: (()=>new Validator({
    name: 'bool',
    validator: Validator.bool,
    message: 'PropTypes warning: Invalid PropType %s supplied to boolean'
  }))(),
  number: (()=>new Validator({
    name: 'number',
    validator: Validator.number,
    message: 'PropTypes warning: Invalid PropType %s supplied to number'
  }))(),
  isNull: (()=>new Validator({
    name: 'isNull',
    validator: Validator.isNull,
    message: 'PropTypes warning: Invalid PropType %s supplied to isNull'
  }))(),
  string: (()=>new Validator({
    name: 'string',
    validator: Validator.string,
    message: 'PropTypes warning: Invalid PropType %s supplied to string'
  }))(),
  array: (()=>new Validator({
    name: 'array',
    validator: Validator.array,
    message: 'PropTypes warning: Invalid PropType %s supplied to array'
  }))(),
  object: (()=>new Validator({
    name: 'object',
    validator: Validator.object,
    message: 'PropTypes warning: Invalid PropType %s supplied to object'
  }))(),
	oneOf: function(rules) {
		if(!Validator.array(rules)) {
			throw new PropTypeError('PropTypes warning: Invalid argument supplied to oneOf, expected an instance of array.');
		}
		return new Validator({
			name: 'oneOf',
			validator: Validator.oneOf.bind(rules),
			message: 'PropTypes warning: Invalid %s supplied to oneOf, expected an instance of ' + rules
		});
	},
  oneOfType: function(rules) {
    if(!Validator.array(rules)) {
      throw new PropTypeError('PropTypes warning: Invalid argument supplied to oneOf, expected an instance of array.');
    }
    return new Validator({
      name: 'oneOfType',
      validator: Validator.oneOfType.bind(rules),
      message: 'PropTypes warning: Invalid %s supplied to oneOfType, expected an instance of ' + rules
    });
  }
};

function checkProps(props, rules) {

	let prop, rule, error = false;
	for ( let propName in props ) {
		if ( props.hasOwnProperty(propName) ) {
			prop = props[propName];
			rule = rules[propName];

			if ( rule && !rule.validator(prop) ) {
				if ( rule.required && prop === undefined ) {
					error = 'PropTypes warning: data for the required prop ' + propName + ' is absent!'
				} else if ( !rule.validator(prop) ) {
					error = rule.message.replace(/%s/g, prop);
				}

			}

		}
	}

	if ( (error) ) {
		throw new PropTypeError(error, props)
	}

}

/**
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
function PropTypeError(message, stack) {
	this.message = message;
	this.stack = stack;
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;

export { PropTypes }
export { checkProps }