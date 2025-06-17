import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import './FiltroCaracteristicas.css'

const FiltroCaracteristicas = ({caracteristicas, setter}) => {
    const opciones = [
        'WIFI',
        'PILETA',
        'MASCOTAS_PERMITIDAS',
        'ESTACIONAMIENTO'
    ];

    return (
        <FormControl className="selectorCaracteristicas">
            <InputLabel id="caracteristicasLabel">Características</InputLabel>
            <Select
                labelId="caracteristicasLabel"
                multiple
                value={caracteristicas ?? []}
                onChange={(e) => setter(e.target.value)}
                input={<OutlinedInput label="Características" />}
            >
                {opciones.map((c) => (
                    <MenuItem key={c} value={c}>
                        {c}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default FiltroCaracteristicas;