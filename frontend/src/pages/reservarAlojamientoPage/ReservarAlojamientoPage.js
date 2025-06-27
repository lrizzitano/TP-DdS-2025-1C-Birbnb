
import { Box } from "@mui/material";
import CardResumenReserva from "../../components/cardResumenReserva/CardResumenReserva";
import CardPagoReserva from "../../components/cardPagoReserva/CardPagoReserva";

const ReservarAlojamientoPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, p: 3 }}>
      <CardPagoReserva />
      <CardResumenReserva />
    </Box>
  );
};

export default ReservarAlojamientoPage;
