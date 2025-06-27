import { Box, Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

const CardPagoReserva = ({ alojamientoId }) => {
  return (
    <Card sx={{ flex: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          2. Agregá un método de pago
        </Typography>

        <TextField label="Número de tarjeta" fullWidth margin="normal" />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Vencimiento" fullWidth />
          <TextField label="CVV" fullWidth />
        </Box>
        <TextField label="Código postal" fullWidth margin="normal" />

        <FormControl fullWidth margin="normal">
          <InputLabel>País/región</InputLabel>
          <Select defaultValue="Argentina" label="País/región">
            <MenuItem value="Argentina">Argentina</MenuItem>
            <MenuItem value="Uruguay">Uruguay</MenuItem>
            <MenuItem value="Chile">Chile</MenuItem>
          </Select>
        </FormControl>

        <RadioGroup defaultValue="tarjeta" sx={{ mt: 2 }}>
          <FormControlLabel value="tarjeta" control={<Radio />} label="Tarjeta de crédito o débito" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel value="googlepay" control={<Radio />} label="Google Pay" />
        </RadioGroup>

        <Button variant="contained" sx={{ mt: 3 }} fullWidth>
          Siguiente
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPagoReserva;
