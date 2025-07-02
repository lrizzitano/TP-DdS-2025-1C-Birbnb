import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">

      <Typography variant="body2" className="footerText">
        © {new Date().getFullYear()} Birbnb - Casi todos los derechos reservados.
      </Typography>

      <Box className="footerIcons">
        <IconButton
          component={Link}
          href="mailto:umagnarelli@frba.utn.edu.ar"
          target="_blank"
          rel="noopener"
          aria-label="Gmail"
        >
          <EmailIcon className="footerIcon" />
        </IconButton>

        <IconButton
          component={Link}
          href="https://www.instagram.com/birbnb.com.ar/"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
        >
          <InstagramIcon className="footerIcon" />
        </IconButton>

        <IconButton
          component={Link}
          href="tel:+5491151076712"
          aria-label="Teléfono"
        >
          <PhoneIcon className="footerIcon" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
