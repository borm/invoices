import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// Actions
import invoices, { items as invoice_items } from 'modules/invoices/actions'
// Components
import { DataTable } from 'components'

import InvoiceCreateForm from 'components/Invoices/InvoiceCreateForm'
import InvoiceRow from 'components/Invoices/InvoiceRow'

@connect(
  state => ({
    state: {
      invoices: state.invoices,
      products: state.products,
      customers: state.customers,

      productsAssociative: state.products.list.storage.reduce((o, product)=>{
        o[product.id] = product;
        return o;
      }, {}),
    }
  }),
  dispatch => ({
    invoices: bindActionCreators({
      list: invoices.list,
      active: invoices.active,
      create: invoices.create,
      update: invoices.update,
    }, dispatch),

    invoice_items: bindActionCreators({
      list: invoice_items.list,
      create: invoice_items.create,
      update: invoice_items.update,
      remove: invoice_items.remove,
    }, dispatch),
  })
)
class Invoices extends Component {

  render() {
    const { state } = this.props;
    const { invoices, products, customers } = state;

    return (
      <div className="container invoices">

        <InvoiceCreateForm
          {...{
            invoice: invoices.list.fromNull,
            invoices, customers, products
          }}
          actions={{
            invoices: this.props.invoices,
            invoice_items: this.props.invoice_items,
          }}
        />

        <hr />

        <DataTable
          head={['id', 'created', 'discount', 'total', 'updated', 'actions']}
          data={invoices.list.storage}
          renderRow={invoice=>(
            <InvoiceRow key={invoice.id}
              {...{invoice, invoices, customers, products}}
              actions={{
                invoices: this.props.invoices,
                invoice_items: this.props.invoice_items,
              }}
            />
          )}
        />

        {((products)=>{

          let invoice_total = invoices.list.storage.reduce((total, invoice)=>{
            let invoiceTotal = invoice.items.reduce((total, item)=>{
              return total + item.quantity * products[item.product_id].price;
            }, 0);
            return total + ( invoiceTotal - ( invoiceTotal * invoice.discount / 100 ) );
          }, 0).toFixed(2);

          return `invoice total ${invoice_total}`;

        })(this.props.state.productsAssociative)}

      </div>
    )
  }
}

export default Invoices;