import { createActions, asyncAction, delay } from 'core/redux';
import Service from './service'

const invoices = createActions('invoices',{

  @asyncAction()
  list() {
    return delay(500).then(()=>Service.invoice.list());
  },

  @asyncAction()
  create({body}){
    return delay(500).then(()=>Service.invoice.create({body}));
  },

  @asyncAction()
  update({id, body}){
    return delay(500).then(()=>Service.invoice.update({id, body}));
  },

  active(id){
    return {id};
  },

  remove(id){
    return {id};
  }

});

const items = createActions('items', {

  @asyncAction()
  list({invoice}){
    return delay(500).then(()=>Service.items.list({invoice_id: invoice.id}));
  },

  @asyncAction()
  create({invoice, product_id}){
    let { id: invoice_id } = invoice;
    return delay(500).then(()=>Service.items.create({invoice_id, product_id}));
  },

  @asyncAction()
  update({invoice, item_id, body}){
    let { id: invoice_id } = invoice;
    return delay(500).then(()=>Service.items.update({invoice_id, item_id, body}));
  },

  @asyncAction()
  remove({invoice, item_id}){
    let { id: invoice_id } = invoice;
    return delay(500).then(()=>Service.items.remove({invoice_id, item_id}));
  },

});

export default invoices;
export {items};