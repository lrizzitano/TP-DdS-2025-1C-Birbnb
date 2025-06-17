import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";

const FiltrosAlojamientos = ({ filtrosTemporales, setFiltrosTemporales, onBuscar }) => {

    const setFiltroTemporal = (event, key, value) => {
        if (value === '') {
            delete filtrosTemporales[key];
        } else {
            setFiltrosTemporales({
                ...filtrosTemporales,
                [key]: value
            });
        }
    }

    const setRangoPrecio = (event, newValue) => {
        setFiltrosTemporales({
            ...filtrosTemporales,
            precioMin: newValue[0],
            precioMax: newValue[1]
        });
    }

    const setCaracteristicas = (event, value) => {
        if (value.length === 0) {
            delete filtrosTemporales.caracteristicas;
            // Reseteo los filtros temporales para que se re-renderice el selector de características
            setFiltrosTemporales({...filtrosTemporales})
        } else {
            setFiltrosTemporales({
                ...filtrosTemporales,
                caracteristicas: value
            });
        }
    }

    const caracteristicas = [
        'WIFI',
        'PILETA',
        'MASCOTAS_PERMITIDAS',
        'ESTACIONAMIENTO'
    ];


    return (
        <div className="contenedor-filtros" style={{ display: 'flex', gap: '10px'}}>


            <TextField
                label="País"
                onChange={(e) => setFiltroTemporal(e, 'pais', e.target.value)}
            />

            <TextField
                label="Ciudad"
                onChange={(e) => setFiltroTemporal(e, 'ciudad', e.target.value)}
            />
            
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="caracteristicas-label">Características</InputLabel>
                <Select
                    labelId="caracteristicas-label"
                    multiple
                    value={filtrosTemporales.caracteristicas ?? []}
                    onChange={(e) => setCaracteristicas(e, e.target.value)}
                    input={<OutlinedInput label="Características" />}
                >
                    {caracteristicas.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ width: 300 }}>
                <Typography gutterBottom>
                    Precio por noche:
                </Typography>
                <Slider
                    getAriaLabel={() => 'Rango de precios'}
                    value={[filtrosTemporales.precioMin, filtrosTemporales.precioMax]}
                    onChange={setRangoPrecio}
                    valueLabelDisplay="auto"
                    step={10}
                    min={10}
                    max={200}
                />
            </Box>

            <Button variant="contained" color="primary" onClick={onBuscar} startIcon={<SearchIcon />}>
                Buscar
            </Button>

        </div>
    )
}

export default FiltrosAlojamientos;
