import FiltroFecha from "../filtroFecha/FiltroFecha";
import "./FiltroRangoFechas.css";

export const FiltroRangoFechas = ({ setter, fechaInicio }) => {
    return (
        <div className="filtroRangoFechas">
            <FiltroFecha etiqueta='Fecha Inicio' campo='fechaInicio' setter={setter} minDate={new Date().toLocaleDateString("en-US")} />
            <FiltroFecha etiqueta='Fecha Fin' campo='fechaFin' setter={setter} minDate={fechaInicio} />
        </div>
    )
}