import { useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, Button,
  MenuItem, Checkbox, FormControlLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { crearAlojamientoBackend } from "../../api/api";

const AgregarAlojamientoPage = () => {
  const navigate = useNavigate();

const [form, setForm] = useState({
  nombre: "",
  descripcion: "",
  precioPorNoche: "",
  moneda: 1,
  cantHuespedesMax: "",
  horarioCheckIn: "14:00",
  horarioCheckOut: "10:00",
  direccion: {
    calle: "",
    altura: "",
    ciudad: "",
    pais: "",
    lat: "",
    long: ""
  },
  caracteristicas: [],
  fotos: [
    {
      descripcion: "",
      path: ""
    }
  ]
});

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "Campo requerido";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "Campo requerido";
    if (!/^\d+(\.\d{1,2})?$/.test(form.precioPorNoche)) nuevosErrores.precioPorNoche = "Número inválido";
    if (!/^\d+$/.test(form.cantHuespedesMax)) nuevosErrores.cantHuespedesMax = "Número entero";

    const dir = form.direccion;
    if (!dir.calle.trim()) nuevosErrores.calle = "Campo requerido";
    if (!dir.altura.trim()) nuevosErrores.altura = "Campo requerido";
    if (!dir.ciudad.trim()) nuevosErrores.ciudad = "Campo requerido";
    if (!dir.pais.trim()) nuevosErrores.pais = "Campo requerido";
    if (!dir.lat.trim() || isNaN(dir.lat)) nuevosErrores.lat = "Latitud inválida";
    if (!dir.long.trim() || isNaN(dir.long)) nuevosErrores.long = "Longitud inválida";

    if(!form.fotos.some(f => f.path.trim() !== "")) nuevosErrores.fotos = "Debe agregar al menos una foto";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDireccionChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      direccion: { ...prev.direccion, [name]: value }
    }));
  };

  const handleCaracteristicaToggle = (id) => {
    setForm(prev => {
      const actual = new Set(prev.caracteristicas);
      actual.has(id) ? actual.delete(id) : actual.add(id);
      return { ...prev, caracteristicas: Array.from(actual) };
    });
  };

  const handleFotoChange = (index, field, value) => {
    const nuevasFotos = [...form.fotos];
    nuevasFotos[index][field] = value;
    setForm(prev => ({ ...prev, fotos: nuevasFotos }));
  };

  const handleSubmit = async () => {
    if (!validar()) return;

    const nuevoAlojamiento = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precioPorNoche: parseFloat(form.precioPorNoche),
      moneda: parseInt(form.moneda),
      cantHuespedesMax: parseInt(form.cantHuespedesMax),
      horarioCheckIn: form.horarioCheckIn,
      horarioCheckOut: form.horarioCheckOut,
      direccion: {
        calle: form.direccion.calle,
        altura: form.direccion.altura,
        ciudad: {
          nombre: form.direccion.ciudad,
          pais: { nombre: form.direccion.pais }
        },
        lat: parseFloat(form.direccion.lat),
        long: parseFloat(form.direccion.long)
      },
      caracteristicas: form.caracteristicas.map(Number),
      fotos: form.fotos.filter(f => f.path.trim() !== ""),
      anfitrion: "6835f4add17340a15cb50737"
    };

    try {
      const resultado = await crearAlojamientoBackend(nuevoAlojamiento);
      if (resultado !== -1) {
        alert("✅ Alojamiento creado exitosamente");
        navigate("/"); // 
      }
    } catch (error) {
      console.error("Error al crear el alojamiento:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Agregar nuevo alojamiento</Typography>

          <TextField label="Nombre" name="nombre" fullWidth margin="normal"
            value={form.nombre} onChange={handleChange}
            error={!!errores.nombre} helperText={errores.nombre} />

          <TextField label="Descripción" name="descripcion" fullWidth margin="normal" multiline rows={3}
            value={form.descripcion} onChange={handleChange}
            error={!!errores.descripcion} helperText={errores.descripcion} />

          <TextField label="Precio por noche" name="precioPorNoche" fullWidth margin="normal"
            value={form.precioPorNoche} onChange={handleChange}
            error={!!errores.precioPorNoche} helperText={errores.precioPorNoche} />

          <TextField select label="Moneda" name="moneda" fullWidth margin="normal"
            value={form.moneda} onChange={handleChange}>
            <MenuItem value={1}>USD</MenuItem>
            <MenuItem value={2}>ARS</MenuItem>
            <MenuItem value={3}>EUR</MenuItem>
          </TextField>

          <TextField label="Máx. huéspedes" name="cantHuespedesMax" fullWidth margin="normal"
            value={form.cantHuespedesMax} onChange={handleChange}
            error={!!errores.cantHuespedesMax} helperText={errores.cantHuespedesMax} />

          <TextField label="Check-in" name="horarioCheckIn" type="time" fullWidth margin="normal"
            value={form.horarioCheckIn} onChange={handleChange} />
          <TextField label="Check-out" name="horarioCheckOut" type="time" fullWidth margin="normal"
            value={form.horarioCheckOut} onChange={handleChange} />

          <Typography variant="h6" sx={{ mt: 2 }}>Dirección</Typography>

          <TextField label="Calle" name="calle" fullWidth margin="dense"
            value={form.direccion.calle} onChange={handleDireccionChange}
            error={!!errores.calle} helperText={errores.calle} />
          <TextField label="Altura" name="altura" fullWidth margin="dense"
            value={form.direccion.altura} onChange={handleDireccionChange}
            error={!!errores.altura} helperText={errores.altura} />
          <TextField label="Ciudad" name="ciudad" fullWidth margin="dense"
            value={form.direccion.ciudad} onChange={handleDireccionChange}
            error={!!errores.ciudad} helperText={errores.ciudad} />
          <TextField label="País" name="pais" fullWidth margin="dense"
            value={form.direccion.pais} onChange={handleDireccionChange}
            error={!!errores.pais} helperText={errores.pais} />
          <TextField label="Latitud" name="lat" type="number" fullWidth margin="dense"
            value={form.direccion.lat} onChange={handleDireccionChange} 
            error={!!errores.lat} helperText={errores.lat} />
          <TextField label="Longitud" name="long" type="number" fullWidth margin="dense"
            value={form.direccion.long} onChange={handleDireccionChange}
            error={!!errores.long} helperText={errores.long} />


          <Typography variant="h6" sx={{ mt: 2 }}>Características</Typography>
          {[{ id: 0, nombre: "WiFi" }, { id: 1, nombre: "Piscina" }, { id: 2, nombre: "Mascotas" },{ id: 3, nombre: "Estacionamiento" }].map(c => (
            <FormControlLabel
              key={c.id}
              control={<Checkbox checked={form.caracteristicas.includes(c.id)} onChange={() => handleCaracteristicaToggle(c.id)} />}
              label={c.nombre}
            />
          ))}

          <Typography variant="h6" sx={{ mt: 2 }}>Fotos</Typography>
          {form.fotos.map((foto, idx) => (
            <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                label="Descripción"
                value={foto.descripcion}
                onChange={(e) => handleFotoChange(idx, "descripcion", e.target.value)}
                fullWidth />
              <TextField
                label="URL"
                value={foto.path}
                onChange={(e) => handleFotoChange(idx, "path", e.target.value)}
                error={!!errores.fotos} helperText={errores.fotos}
                fullWidth />
            </Box>
          ))}

          <Button variant="outlined" size="small" sx={{ mt: 1, mb: 2 }}
            onClick={() => {
              setForm(prev => ({
                ...prev,
                fotos: [...prev.fotos, { descripcion: "", path: "" }]
              }));
            }}>
            Agregar otra foto
          </Button>

          <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={handleSubmit}>
            Confirmar alta de alojamiento
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AgregarAlojamientoPage;
