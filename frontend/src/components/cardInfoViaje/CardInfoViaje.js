import { Box, Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import DropdownHuespedes from "../dropdownHuespedes/DropdownHuespedes";
import { FiltroRangoFechas } from "../filtroRangoFechas/FiltroRangoFechas";

const CardPagoReserva = ({ alojamientoId }) => {
  return (
    <Card sx={{ flex: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          1. Agregá la información del viaje
        </Typography>

        TODO: Pasarle las funciones a ambos inputs para que cumplan su funcion

        <DropdownHuespedes />
        <FiltroRangoFechas />
      </CardContent>
    </Card>
  );
};

export default CardPagoReserva;
