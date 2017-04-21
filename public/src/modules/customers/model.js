import Model, { PropTypes } from 'core/model'

class Customer extends Model {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,

    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  };

  static defaultProps = {
    id: 0,
    name: '',
    phone: '',
    address: '',

    createdAt: '',
    updatedAt: '',
  };

  constructor(props){
    super(props);
  }

}

class Customers extends Model {
  static propTypes = {
    storage: PropTypes.array,
    page: PropTypes.number,
    limit: PropTypes.number,
  };

  static defaultProps = {
    storage: [],
    page: 0,
    limit: Infinity,
  };

  constructor(props){
    super(props);
    this.storage = this.props.storage.map(c=>new Customer(c))
  }

  static fromApiResponse({storage}){
    return new Customers({storage});
  }

}

export default Customers;