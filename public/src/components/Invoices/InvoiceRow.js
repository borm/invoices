import moment from 'moment'
import DropDown, { Item as DropItem } from 'mui/lib/components/DropDown/DropDown'
import Modal from 'mui/lib/components/Modal/Modal'

import InvoiceForm from 'components/Invoices/InvoiceForm'

class InvoicesRow extends React.Component {

  constructor(props){
    super(props);
    this.modal = `invoice-form-${props.invoice.id}`
  }

  componentDidMount(){
    this.props.actions.invoice_items.list({invoice: this.props.invoice})
  }

  handleChangeActions(invoice){
    const { id } = invoice;
    return (e, selected)=>{
      switch (selected.value){
        case 'edit':
          Modal.toggle(this.modal, true);
          break;
      }
    }
  }

  render(){
    const { invoice, invoices, customers, products } = this.props;
    const { id } = invoice;
    return (
      <tr>
        <td>{id}</td>
        <td>{moment(invoice.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>{invoice.discount}</td>
        <td>{invoice.total}</td>
        <td>{moment(invoice.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>
          <DropDown onChange={::this.handleChangeActions(invoice)}>
            <DropItem value="edit" text="Edit" />
          </DropDown>
          <Modal id={this.modal} size={'small'}>
            <InvoiceForm {...{
              invoice,
              state: {invoices, customers, products,},
              actions: this.props.actions
            }} />
          </Modal>
        </td>
      </tr>
    )
  }

}

export default InvoicesRow;