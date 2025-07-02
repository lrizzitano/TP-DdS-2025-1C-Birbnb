
import { Box } from "@mui/material";
import CardResumenReserva from "../../components/cardResumenReserva/CardResumenReserva";
import CardPagoReserva from "../../components/cardPagoReserva/CardPagoReserva";
import CardInfoViaje from "../../components/cardInfoViaje/CardInfoViaje";
import BotonVolver from "../../components/botonVolver/BotonVolver";

const ReservarAlojamientoPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <BotonVolver />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <div className="columnaInputs">
          <CardPagoReserva />
          <CardInfoViaje />
        </div>
        <CardResumenReserva />
      </Box>
    </Box>
  );
};

export default ReservarAlojamientoPage;
