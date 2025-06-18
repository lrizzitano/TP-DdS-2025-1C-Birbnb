import TextField from '@mui/material/TextField'

const FiltroTextual = ({ campo, setter }) => {
  return (
    <TextField
      label={campo.charAt(0).toUpperCase() + campo.slice(1)}
      onChange={(e) => setter(campo, e.target.value)}
    />
  )
}

export default FiltroTextual;