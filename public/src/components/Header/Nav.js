import { Link } from 'react-router'
const Nav = ()=>(
  <ul className="inline-block">
    <li><Link to="/products" activeStyle={{ color: 'red' }}>Products</Link></li>
    <li><Link to="/customers" activeStyle={{ color: 'red' }}>Customers</Link></li>
    <li><Link to="/invoices" activeStyle={{ color: 'red' }}>Invoices</Link></li>
  </ul>
);

export default Nav;