import { Card, CardContent, Typography, Divider } from '@mui/material';


const CardUsuario = ({ usuario }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {usuario.nombre}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2"><strong>Email:</strong> {usuario.email}</Typography>
            </CardContent>
        </Card>
    )
}
export default CardUsuario;