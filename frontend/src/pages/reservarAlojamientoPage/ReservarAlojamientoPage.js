
import { Box } from "@mui/material";
import CardResumenReserva from "../../components/cardResumenReserva/CardResumenReserva";
//import CardPagoReserva from "../../components/cardPagoReserva/CardPagoReserva"; esta card era para poner la tarjeta, se borro 
import CardInfoViaje from "../../components/cardInfoViaje/CardInfoViaje";
import BotonVolver from "../../components/botonVolver/BotonVolver";

const ReservarAlojamientoPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <BotonVolver />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <div className="columnaInputs">
          <CardInfoViaje />
          {/* <CardPagoReserva /> Esta card se borro, pero se dejo el comentario para que no de error */}
        </div>
        <CardResumenReserva />
      </Box>
    </Box>
  );
};

export default ReservarAlojamientoPage;
