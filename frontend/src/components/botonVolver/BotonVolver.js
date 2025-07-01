
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

const BotonVolver = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 2 }}>
        <Button 
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        variant="outlined"
        size="small"
        >
        Volver
        </Button>
    </Box>
    );
}

export default BotonVolver;