import './Footer.css'; 

const Footer = (props) => {
  return (
    <footer className="Footer">
         {props.text}
    </footer>
  );
};

export default Footer;