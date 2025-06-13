import './Header.css'; 

const Header = (props) => {
  return (
    <header className="header">
         {props.text}
    </header>
  );
};

export default Header;