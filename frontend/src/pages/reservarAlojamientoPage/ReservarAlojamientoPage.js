
import { Box } from "@mui/material";
import CardResumenReserva from "../../components/cardResumenReserva/CardResumenReserva";
import CardPagoReserva from "../../components/cardPagoReserva/CardPagoReserva";
import BotonVolver from "../../components/botonVolver/BotonVolver";

const ReservarAlojamientoPage = () => {
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
