// import TextField from '@mui/material/TextField';

// const FiltroTextual = ({campo, setter}) => {
//     return (
//         <TextField
//             label={campo.charAt(0).toUpperCase() + campo.slice(1)}
//             onChange={(e) => setter(campo, e.target.value)}
//         />
//     )
// }

// export default FiltroTextual;

import TextField from '@mui/material/TextField';

const FiltroTextual = ({ campo, setter }) => {
  const labels = {
    pais: "País",
    ciudad: "Ciudad",
    cantHuespedes: "Cantidad de huéspedes"
    // podés agregar más campos si querés customizar otros
  };

  return (
    <TextField
      label={labels[campo] || (campo.charAt(0).toUpperCase() + campo.slice(1))}
      onChange={(e) => setter(campo, e.target.value)}
      type={campo === 'cantHuespedes' ? 'number' : 'text'}
    />
  );
};

export default FiltroTextual;