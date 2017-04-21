import { createReducer, getActionIds } from 'core/redux';
import invoiceActions, { items as invoiceItemsActions } from './actions';
import Invoices, { Invoice, InvoiceItem } from './model';
import find from 'lodash.find';
import findindex from 'lodash.findindex';

export default createReducer(
  {
    list: new Invoices()
  }, (
  (invoices, items)=>{
  return {

    [invoices.list.success]: (state, action) => {
      return {...state,
        list: Invoices.fromApiResponse({storage: action.result})
      };
    },

    [invoices.list.failed]: (state) => {
      return {...state,
        list: new Invoices(),
      };
    },

    [invoices.create.success]: (state, action) => {
      let list = state.list.push(action.result);
      return {...state, list}
    },

    [invoices.update.success]: (state, action) => {
      let list = state.list.update(action.params.id, action.result);
      return {...state, list}
    },

    /**
     * invoice_items
     */
    [items.list.success]: (state, action) => {
      let {
        params: {invoice},
        params: {invoice: {id}},
        result
      } = action;

      invoice.items = result;

      let list = state.list.update(id, invoice);

      return {...state, list}
    },

    [items.create.success]: (state, action) => {

      let {
        params: {invoice},
        params: {invoice: {id}},
        result
      } = action;

      invoice.items.push(new InvoiceItem(result));

      let list = state.list.update(id, invoice);
      return {...state, list}
    },

    [items.update.success]: (state, action) => {

      let {
        params: {invoice},
        params: {invoice: {id}, item_id},
        result
      } = action;

      let itemIdx = findindex(invoice.items, {id: item_id});
      invoice.items[itemIdx] = new InvoiceItem({
        ...invoice.items[itemIdx],
        ...result
      });

      let list = state.list.update(id, invoice);

      return {...state, list};

    },

    [items.remove.success]: (state, action) => {

      let {
        params: {invoice},
        params: {invoice: {id}, item_id},
        result
      } = action;

      let itemIdx = findindex(invoice.items, {id: item_id});
      invoice.items.splice(itemIdx, 1);

      let list = state.list.update(id, invoice);
      return {...state, list}
    },

  }
})(
  getActionIds(invoiceActions),
  getActionIds(invoiceItemsActions),
));