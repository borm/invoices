import Model, { PropTypes } from 'core/model'

class Product extends Model {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,

    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  };

  static defaultProps = {
    id: 0,
    name: '',
    price: 0,

    createdAt: '',
    updatedAt: '',
  };

  constructor(props){
    super(props);
  }

}

class Products extends Model {
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
    this.storage = this.props.storage.map(c=>new Product(c))
  }

  static fromApiResponse({storage}){
    return new Products({storage});
  }

}

export default Products;