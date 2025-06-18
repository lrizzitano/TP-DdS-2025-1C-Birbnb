import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

const FiltroFecha = ({ campo, setter }) => {

    const [startDate, setStartDate] = useState(new Date());


    return (
        <div>
            {campo}
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
