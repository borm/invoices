import Paper from 'mui/lib/components/Paper'
import Logo from 'components/Header/Logo'
import Nav from 'components/Header/Nav'

const Header = ()=>(
  <Paper className="header justify">
    <Logo />
    &nbsp;
    <Nav />
  </Paper>
);

export default Header;