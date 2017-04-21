import React, {Component} from 'react';

import Button from 'mui/lib/components/Button/Button'
import Modal from 'mui/lib/components/Modal/Modal'

import InvoiceForm from 'components/Invoices/InvoiceForm'

class InvoiceCreateForm extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  handleClickCreateButton(){
    Modal.toggle('invoice-create-form', true);
  }

  render() {
    const { invoice, invoices, customers, products } = this.props;

    return (
      <div className="clearfix">
        <Button className="float-right" onClick={this.handleClickCreateButton}>
          Create invoice
        </Button>

        <Modal id={'invoice-create-form'} size={'small'}>
          <InvoiceForm {...{
            invoice,
            state: {invoices, customers, products},
            actions: this.props.actions
          }} />
        </Modal>
      </div>
    );
  }
}

export default InvoiceCreateForm;