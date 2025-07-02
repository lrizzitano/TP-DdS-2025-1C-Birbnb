import { Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const ModalUsuario = ({ open, anchorEl, handleClose, usuario }) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            slotProps={{
                paper: {
                    sx: { p: 2, minWidth: 200 }
                }
            }}
        >
            <Typography variant="subtitle1">{usuario.nombre}</Typography>
            <Typography variant="body2" color="text.secondary">{usuario.email}</Typography>
            <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                component={Link}
                to={`/reservas/${usuario.id}`}
                onClick={handleClose}
            >
                Ver reservas activas
            </Button>
        </Popover>


    );
}
export default ModalUsuario;