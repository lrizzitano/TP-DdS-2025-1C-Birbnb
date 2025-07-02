import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownHuespedes({ campo, setter, max = 10 }) {
  const [huespedes, setHuespedes] = useState(1);

  const handleChange = (event) => {
    const value = event.target.value;
    setHuespedes(value);
    setter(campo, value);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel>Huéspedes</InputLabel>
        <Select
          value={huespedes}
          label="Huéspedes"
          onChange={handleChange}
        >
          {Array.from({ length: max }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
