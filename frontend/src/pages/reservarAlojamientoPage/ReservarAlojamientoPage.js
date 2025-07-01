
import { Box } from "@mui/material";
import CardResumenReserva from "../../components/cardResumenReserva/CardResumenReserva";
import CardPagoReserva from "../../components/cardPagoReserva/CardPagoReserva";

import { useNavigate } from 'react-router-dom';
import { IconButton, Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import BotonVolver from "../../components/botonVolver/BotonVolver";

const ReservarAlojamientoPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <BotonVolver />
      
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <CardPagoReserva />
        <CardResumenReserva />
      </Box>
    </Box>
  );
};

export default ReservarAlojamientoPage;
