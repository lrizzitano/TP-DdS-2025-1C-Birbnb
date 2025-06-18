import CardNotificacion from '../cardNotificacion/CardNotificacion';
import { Drawer, List, Divider, Typography } from '@mui/material';

const DrawerNotificaciones = ({openDrawer, closeDrawer, listaNotificaciones, eliminarNotificacion}) => {

    return (
        <Drawer anchor="right" open={openDrawer} onClose={closeDrawer} slotProps={{
            paper: {
                sx: {
                    mt: '4rem',
                    height: 'calc(100vh - 4rem)',
                }
            }
        }}>
            <div style={{ width: 350, padding: '16px' }}>
                <Typography variant='h5'>
                    Notificaciones
                </Typography>
                <Divider />
                <List className='listaNotificaciones'>
                    {listaNotificaciones.map((notif) => (
                        <CardNotificacion
                            key={notif.id}
                            notificacion={notif}
                            marcarComoLeida={eliminarNotificacion}
                        />
                    ))}
                </List>
            </div>
        </Drawer>
    );
}
export default DrawerNotificaciones;