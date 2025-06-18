import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { Typography } from '@mui/material';

const FiltroFecha = ({ etiqueta, campo, setter }) => {

    const [startDate, setStartDate] = useState(new Date());


    return (
        <div>
            <Typography variant="body1" gutterBottom>
                {etiqueta}
            </Typography>
            <DatePicker
                selected={startDate}
                dateFormat="MM-dd-yyyy"
                onChange={(date) => {
                    setter(campo, date)
                    setStartDate(date);
                }
                }
            />
        </div>
    );

}
export default FiltroFecha;
