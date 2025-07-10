import { useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, Button
} from "@mui/material";

const AgregarAlojamientoPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precioPorNoche: "",
    cantHuespedesMax: "",
    horarioCheckIn: "",
    horarioCheckOut: "",
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = "Campo requerido";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "Campo requerido";
    if (!/^\d+(\.\d{1,2})?$/.test(form.precioPorNoche)) nuevosErrores.precioPorNoche = "Debe ser un número válido";
    if (!/^\d+$/.test(form.cantHuespedesMax)) nuevosErrores.cantHuespedesMax = "Debe ser un número entero";


    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (validar()) {
      console.log("Formulario válido. Enviando:", form);
      // TODO: axios.post("/alojamientos", {...})
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Agregar nuevo alojamiento
          </Typography>

          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="normal"
            value={form.nombre}
            onChange={handleChange}
            error={!!errores.nombre}
            helperText={errores.nombre}
          />

          <TextField
            label="Descripción"
            name="descripcion"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={form.descripcion}
            onChange={handleChange}
            error={!!errores.descripcion}
            helperText={errores.descripcion}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Precio por noche"
              name="precioPorNoche"
              fullWidth
              value={form.precioPorNoche}
              onChange={(e) => {
                if (/^\d{0,7}(\.\d{0,2})?$/.test(e.target.value)) {
                  setForm(prev => ({ ...prev, precioPorNoche: e.target.value }));
                }
              }}
              error={!!errores.precioPorNoche}
              helperText={errores.precioPorNoche}
            />
            <TextField
              label="Máx. huéspedes"
              name="cantHuespedesMax"
              fullWidth
              value={form.cantHuespedesMax}
              onChange={(e) => {
                if (/^\d{0,3}$/.test(e.target.value)) {
                  setForm(prev => ({ ...prev, cantHuespedesMax: e.target.value }));
                }
              }}
              error={!!errores.cantHuespedesMax}
              helperText={errores.cantHuespedesMax}
            />
          </Box>

          <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={handleSubmit}>
            Confirmar alta de alojamiento
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AgregarAlojamientoPage;
