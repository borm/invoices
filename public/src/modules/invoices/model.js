import Model, { PropTypes } from 'core/model'
import findindex from 'lodash.findindex';

class InvoiceItem extends Model {

  /*static propTypes = {
    id: PropTypes.number,
    invoice_id: PropTypes.oneOfType([
      PropTypes.number, PropTypes.isNull
    ]),
    product_id: PropTypes.oneOfType([
      PropTypes.number, PropTypes.isNull
    ]),

    quantity: PropTypes.oneOfType([
      PropTypes.number, PropTypes.isNull
    ]),

    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  };*/

  static defaultProps = {
    id: 0,
    invoice_id: 0,
    product_id: 0,

    quantity: 0,

    createdAt: '',
    updatedAt: '',
  };

  constructor(props){
    super(props);
    this.invoice_id = parseInt(this.props.invoice_id);
    this.product_id = parseInt(this.props.product_id);
  }

}

class Invoice extends Model {

  /*static propTypes = {
    id: PropTypes.number,
    customer_id: PropTypes.oneOfType([
      PropTypes.number, PropTypes.isNull
    ]),

    items: PropTypes.array,

    discount: PropTypes.oneOfType([
      PropTypes.number, PropTypes.isNull
    ]),
    total: PropTypes.oneOfType([
      PropTypes.number, PropTypes.isNull
    ]),

    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  };*/

  static defaultProps = {
    id: 0,
    customer_id: 0,

    items: [],

    discount: 0,
    total: 0,

    createdAt: '',
    updatedAt: '',
  };

  constructor(props){
    super(props);
    this.items = this.props.items.map(item=>new InvoiceItem(item));
    this.discount = parseInt(this.props.discount);
  }
}

class Invoices extends Model {
  /*static propTypes = {
    storage: PropTypes.array,
    page: PropTypes.number,
    limit: PropTypes.number,
  };*/

  static defaultProps = {
    fromNull: new Invoice(),
    storage: [],
    page: 0,
    limit: Infinity,
    store: [],
    test: null,
  };

  static fromApiResponse({storage}){
    return new Invoices({storage});
  }

  push(invoice){
    this.storage.push(new Invoice(invoice));
    return this;
  }

  update(id, invoice){
    let index = findindex(this.storage, {id});
    if ( index !== -1 ) {
      this.storage[index] = new Invoice({
        ...this.storage[index],
        ...invoice
      })
    }
    return this;
  }

  constructor(props){
    super(props);
    this.storage = this.props.storage.map(i=>new Invoice(i));
  }

}

export default Invoices
export {Invoice}
export {InvoiceItem}