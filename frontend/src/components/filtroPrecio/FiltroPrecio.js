import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from "@mui/material/Slider";

const FiltroPrecio = ({precioMin, precioMax, setter}) => {
    return (
        <Box sx={{ width: 300 }}>
        <Typography gutterBottom>
            Precio por noche:
        </Typography>
        <Slider
            getAriaLabel={() => 'Rango de precios'}
            value={[precioMin, precioMax]}
            onChange={(e) => setter(e.target.value)}
            valueLabelDisplay="auto"
            step={10}
            min={10}
            max={300}
        />
    </Box>
    )
}

export default FiltroPrecio;