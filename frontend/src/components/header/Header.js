import './Header.css'; 
import { Link } from "react-router-dom";
import logo from '../../images/logo.png'

const Header = (props) => {
  return (
    <header className="header">
      <Link to="/"><img src={logo} alt="Logo birbnb" className = "logo"/></Link>
    </header>
  );
};

export default Header;