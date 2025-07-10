import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from "@mui/material/Slider";

const FiltroPrecio = ({precioMin, precioMax, setter}) => {
    return (

    <Box sx={{ width: 300 }}>
            <Typography gutterBottom>
                Precio por noche:
            </Typography>


            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                <Typography variant="body2">${precioMin}</Typography>

                <Slider
                    getAriaLabel={() => 'Rango de precios'}
                    value={[precioMin, precioMax]}
                    onChange={(e, nuevoValor) => setter(nuevoValor)}
                    valueLabelDisplay="auto"
                    step={10}
                    min={10}
                    max={300}
                    sx={{ flexGrow: 1 }}
                />
                
                <Typography variant="body2">${precioMax}</Typography>
            </Box>
    </Box>
    )
}

export default FiltroPrecio;