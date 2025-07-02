import { useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, Button
} from "@mui/material";

const CardPagoReserva = () => {
  const [tarjeta, setTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};
    if (!/^\d{16}$/.test(tarjeta)) nuevosErrores.tarjeta = "Debe tener 16 dígitos numéricos";
    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) nuevosErrores.vencimiento = "Formato inválido (MM/YY)";
    if (!/^\d{3}$/.test(cvv)) nuevosErrores.cvv = "Debe tener 3 dígitos";
    if (!/^\d{4}$/.test(codigoPostal)) nuevosErrores.codigoPostal = "Debe tener 4 dígitos";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = () => {
    validar()
  };

  return (
    <Card sx={{ flex: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          1. Agregá un método de pago
        </Typography>

        <TextField
          label="Número de tarjeta"
          fullWidth
          margin="normal"
          value={tarjeta}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,16}$/.test(value)) setTarjeta(value);
          }}
          error={!!errores.tarjeta}
          helperText={errores.tarjeta}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Vencimiento"
            fullWidth
            value={vencimiento}
            onChange={(e) => {
              let value = e.target.value;
              // permitir solo digitos y "/"
              if (/^[0-9/]{0,5}$/.test(value)) {
                // auto-agrega la barra después de 2 digitos
                if (/^\d{2}$/.test(value)) value = value + "/";
                setVencimiento(value);
              }
            }}
            error={!!errores.vencimiento}
            helperText={errores.vencimiento}
          />
          <TextField
            label="CVV"
            fullWidth
            value={cvv}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,3}$/.test(value)) setCvv(value);
            }}
            error={!!errores.cvv}
            helperText={errores.cvv}
          />
        </Box>

        <TextField
          label="Código postal"
          fullWidth
          margin="normal"
          value={codigoPostal}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,4}$/.test(value)) setCodigoPostal(value);
          }}          
          error={!!errores.codigoPostal}
          helperText={errores.codigoPostal}
        />

        <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={handleSubmit}>
          Validar
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPagoReserva;