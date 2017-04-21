import fetch from 'core/fetch'
class InvoiceService {

  /**
   * invoice
   */
  static invoice = {
    /**
     * Get invoices list
     */
    list() {
      return fetch('/invoices');
    },
    /**
     * Create new invoice
     */
    create({body}) {
      return fetch('/invoices', {
        method: 'post',
        body
      });
    },
    /**
     * Update invoice by {id}
     * @param id
     * @param body
     */
    update({id, body}) {
      return fetch(`/invoices/${id}`, {
        method: 'put',
        body
      });
    },
    /**
     * Remove invoice by {id}
     * @param id
     */
    remove({id}) {
      return fetch(`/invoices/${id}`,{
        method: 'delete'
      });
    }
  };

  /**
   * invoice_items
   */
  static items = {
    /**
     * get invoice items by {invoice_id}
     * @param invoice_id
     */
    list({invoice_id}) {
      return fetch(`/invoices/${invoice_id}/items`);
    },
    /**
     * Create new invoice item
     * @param invoice_id
     * @param product_id
     */
    create({invoice_id, product_id}) {
      return fetch(`/invoices/${invoice_id}/items`,{
        method: 'post',
        body: {product_id, invoice_id, quantity: 1}
      });
    },
    /**
     * Update invoice item by {invoice_id, item_id}
     * @param invoice_id
     * @param item_id
     * @param body
     */
    update({invoice_id, item_id, body}) {
      return fetch(`/invoices/${invoice_id}/items/${item_id}`, {
        method: 'put',
        body
      });
    },
    /**
     * Remove invoice item by {invoice_id, item_id}
     * @param invoice_id
     * @param item_id
     */
    remove({invoice_id, item_id}) {
      return fetch(`/invoices/${invoice_id}/items/${item_id}`,{
        method: 'delete'
      });
    }
  }

}

export default InvoiceService;