import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const FiltroFecha = ({ etiqueta, campo, setter, minDate }) => {
  const [startDate, setStartDate] = useState(new Date());

  // Si se selecciona una fecha anterior al mínimo permitido, la corrige automáticamente
  useEffect(() => {
    if (minDate && startDate < minDate) {
      setStartDate(minDate);
      setter(campo, minDate);
    }
  }, [minDate]);

  return (
    <div>
      <Typography variant="body1" gutterBottom>
        {etiqueta}
      </Typography>
      <DatePicker
        selected={startDate}
        dateFormat="MM-dd-yyyy"
        minDate={minDate ?? new Date().toLocaleDateString("en-US")} // Esto bloquea fechas anteriores
        onChange={(date) => {
          setter(campo, date);
          setStartDate(date);
        }}
      />
    </div>
  );
};

export default FiltroFecha;
