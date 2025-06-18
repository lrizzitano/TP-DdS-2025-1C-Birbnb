import TextField from '@mui/material/TextField';

const FiltroTextual = ({ campo, setter }) => {

    return (
        <TextField
            label={campo.charAt(0).toUpperCase() + campo.slice(1)}
            onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value >= 0 || e.target.value === '')
                    setter(campo, e.target.value)
            }
            }
            type='number'
            slotProps={{
                htmlInput: {
                    min: 0
                }
            }}

        />
    );
};

export default FiltroTextual;