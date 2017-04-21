import fetch from 'core/fetch'
class CustomerService {

  /**
   * Get invoices list or single by {id} if defined
   * @param id
   */
  static list({id}) {
    return fetch(`/customers${typeof id !== 'undefined' ? `/${id}` : ''}`);
  }

}

export default CustomerService;