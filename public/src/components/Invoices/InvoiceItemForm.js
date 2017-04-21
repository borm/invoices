import React, {Component} from 'react';

import Button from 'mui/lib/components/Button/Button'
import Form from 'mui/lib/components/Form'
import Field from 'mui/lib/components/Field/Field'
import Select from 'mui/lib/components/Field/Select'
import SelectItem from 'mui/lib/components/Menu/Item'

import debounce from 'lodash.debounce'

class InvoiceItemForm extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  handleChangeProduct(e){
    this.updateInvoiceItem();
  }

  handleChangeForm = debounce(() => {
    this.updateInvoiceItem();
  }, 1000);

  updateInvoiceItem(){
    const { data } = this.refs.form.getFormData();

    const { invoice, item } = this.props;

    this.props.actions.update({invoice, item_id: item.id, body: data});
  }

  removeInvoiceItem(){
    const { invoice, item } = this.props;

    this.props.actions.remove({invoice, item_id: item.id});
  }

  render() {
    const { item } = this.props;
    return (
      <Form className="row" ref="form">
        <Button icon="delete" onClick={::this.removeInvoiceItem}
                className="invoice-items__products__delete-button float-right" />
        <div className="invoice-items__products-form">
          <div className="col-sm-8">
            <Select placeholder="Product name" name="product_id"
                    onChange={::this.handleChangeProduct}
                    defaultValue={item.product_id}>
              { this.props.products.map(product=>(
                <SelectItem value={product.id} key={product.id} text={product.name}/>
              )) }
            </Select>
          </div>
          <div className="col-sm-4">
            <Field placeholder="Quantity" name="quantity"
                   defaultValue={item.quantity} type="number"
                   onChange={::this.handleChangeForm} />
          </div>
        </div>
      </Form>
    )
  }
}

export default InvoiceItemForm;