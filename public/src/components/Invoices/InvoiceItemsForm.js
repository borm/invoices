import React, {Component} from 'react';

import Select from 'mui/lib/components/Field/Select'
import SelectItem from 'mui/lib/components/Menu/Item'
import Button from 'mui/lib/components/Button/Button'
import InvoiceItemForm from './InvoiceItemForm'


class InvoiceItemsForm extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      product_id: null
    }
  }

  set product_id(product_id){
    this.setState({product_id})
  }

  handleSelectProduct(e, selected){
    this.product_id = selected.value;
  }

  handleAddSelectedProduct(e){
    this.props.actions.create({
      invoice: this.props.invoice,
      product_id: this.state.product_id
    }).then(
      res=>{
        this.product_id = null;
      }
    );

  }

  render() {
    return (
      <div className="invoice-items">

        <div className="invoice-items__add-form">
          <div className="row">
            <div className="col-xs-8">
              <Select placeholder="Choose product"
                      onChange={::this.handleSelectProduct}
                      value={this.state.product_id}>
                { this.props.state.products.list.storage.map(product=>(
                  <SelectItem value={product.id} key={product.id} text={product.name}/>
                )) }
              </Select>
            </div>
            <div className="col-xs-4">
              <Button className="add" text="Add" accent
                      disabled={!this.state.product_id}
                      onClick={::this.handleAddSelectedProduct} />
            </div>
          </div>
        </div>

        <div className="invoice-items__products">
          { this.props.invoice.items.map(item=>(
            <InvoiceItemForm
              key={item.id} item={item} actions={this.props.actions}
              invoice={this.props.invoice}
              products={this.props.state.products.list.storage} />
          )) }
        </div>

      </div>
    )
  }
}

export default InvoiceItemsForm;