import fetch from 'core/fetch'
class ProductService {

  /**
   * Get invoices list or single by {id} if defined
   * @param id
   */
  static list({id}) {
    return fetch(`/products${typeof id !== 'undefined' ? `/${id}` : ''}`);
  }

}

export default ProductService;