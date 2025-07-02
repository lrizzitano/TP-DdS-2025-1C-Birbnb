import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import FiltroTextual from "../filtroTextual/FiltroTextual";
import FiltroCaracteristicas from "../filtroCaracteristicas/FiltroCaracteristicas"
import FiltroPrecio from "../filtroPrecio/FiltroPrecio";
import FiltroNumerico from "../filtroNumerico/FiltroNumerico";
import FiltroFecha from "../filtroFecha/FiltroFecha";
import DropdownHuespedes from "../dropdownHuespuedes/DropdownHuespedes";

import { useState } from "react";


const FiltrosAlojamientos = ({ filtrosTemporales, setFiltrosTemporales, onBuscar }) => {
    
    const [fechaInicio, setFechaInicio] = useState(null);
    
    const setFiltroTemporal = (key, value) => {
        if (value === '') {
            delete filtrosTemporales[key];
        } else {
            setFiltrosTemporales({
                ...filtrosTemporales,
                [key]: value
            });
        }

        if (key === 'fechaInicio') {
        setFechaInicio(value);
    }
    }

    const setRangoPrecio = ([precioMin, precioMax]) => {
        setFiltrosTemporales({
            ...filtrosTemporales,
            precioMin: precioMin,
            precioMax: precioMax
        });
    }

    const setCaracteristicas = (value) => {
        if (value.length === 0) {
            delete filtrosTemporales.caracteristicas;
            // Reseteo los filtros temporales para que se re-renderice el selector de características
            setFiltrosTemporales({ ...filtrosTemporales })
        } else {
            setFiltrosTemporales({
                ...filtrosTemporales,
                caracteristicas: value
            });
        }
    }

    return (
        <>
            <FiltroTextual campo='ciudad' setter={setFiltroTemporal} />
            <DropdownHuespedes campo='cantHuespedes' setter={setFiltroTemporal} />
            <FiltroCaracteristicas caracteristicas={filtrosTemporales.caracteristicas} setter={setCaracteristicas} />
            <FiltroFecha etiqueta='Fecha Inicio' campo='fechaInicio' setter={setFiltroTemporal} minDate={new Date().toLocaleDateString("en-US")}/>
            <FiltroFecha etiqueta='Fecha Fin' campo='fechaFin' setter={setFiltroTemporal} minDate={fechaInicio}/>
            <FiltroPrecio precioMin={filtrosTemporales.precioMin} precioMax={filtrosTemporales.precioMax} setter={setRangoPrecio} />
            <Button variant="contained" color="primary" onClick={onBuscar} startIcon={<SearchIcon />}>
                Buscar
            </Button>
        </>
    )
}

export default FiltrosAlojamientos;