import React, {Component} from 'react';
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import Form from 'mui/lib/components/Form'
import Field from 'mui/lib/components/Field/Field'
import Select from 'mui/lib/components/Field/Select'
import SelectItem from 'mui/lib/components/Menu/Item'
import Button from 'mui/lib/components/Button/Button'

import InvoiceItemsForm from 'components/Invoices/InvoiceItemsForm'

import find from 'lodash.find';

class InvoiceForm extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      invoice: props.invoice
    };
    this.setInvoice = ::this.setInvoice;
  }

  tryUpdateInvoice(){
    const { data } = this.refs.form.getFormData();

    const id = this.state.invoice.id;

    switch (id) {
      case 0:
        this.props.actions.invoices.create({body: data}).then(this.setInvoice);
        break;
      default:
        this.props.actions.invoices.update({id, body: data}).then(this.setInvoice);
        break;
    }
  }

  setInvoice(invoice){
    this.setState({invoice});
  }

  set invoice(invoice){
    this.setState({invoice});
  }

  handleChangeForm = debounce(() => {
    this.tryUpdateInvoice();
  }, 1000);

  componentWillUnmount(){
    // this.tryUpdateInvoice();
    this.handleChangeForm.cancel();
  }

  render() {
    const {invoices, customers, products} = this.props.state;
    const invoice = find(invoices.list.storage, {id: this.state.invoice.id}) || this.props.invoice;

    return (
      <div className="invoice-form">
        <Form ref="form">
          <div className="row">
            <div className="col-xs-12">
              <Select placeholder="Customer" name="customer_id"
                      defaultValue={this.state.invoice.customer_id}
                      onChange={::this.tryUpdateInvoice}>
                { customers.list.storage.map(customer=>(
                  <SelectItem value={customer.id} key={customer.id} text={customer.name}/>
                )) }
              </Select>
            </div>
            <div className="col-xs-12">
              <Field placeholder={'Discount'} name="discount"
                     defaultValue={this.state.invoice.discount}
                     onChange={this.handleChangeForm} />
            </div>
          </div>

        </Form>

        { invoice.id !== 0 && (
          <InvoiceItemsForm {...{
            invoice,
            state: {customers, products,},
            actions: this.props.actions.invoice_items
          }} />
        ) }

      </div>
    )
  }
}

export default InvoiceForm;