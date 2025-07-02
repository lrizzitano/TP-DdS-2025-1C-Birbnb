import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import FiltroTextual from "../filtroTextual/FiltroTextual";
import FiltroCaracteristicas from "../filtroCaracteristicas/FiltroCaracteristicas"
import FiltroPrecio from "../filtroPrecio/FiltroPrecio";
import FiltroFecha from "../filtroFecha/FiltroFecha";
import DropdownHuespedes from "../dropdownHuespedes/DropdownHuespedes";

import { useState } from "react";
import { FiltroRangoFechas } from "../filtroRangoFechas/FiltroRangoFechas";


const FiltrosAlojamientos = ({ filtrosTemporales, setFiltrosTemporales, onBuscar }) => {    
    const setFiltroTemporal = (key, value) => {
        if (value === '') {
            delete filtrosTemporales[key];
        } else {
            setFiltrosTemporales({
                ...filtrosTemporales,
                [key]: value
            });
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
            <FiltroRangoFechas setter={setFiltroTemporal} fechaInicio={filtrosTemporales.fechaInicio} />
            <FiltroPrecio precioMin={filtrosTemporales.precioMin} precioMax={filtrosTemporales.precioMax} setter={setRangoPrecio} />
            <Button variant="contained" color="primary" onClick={onBuscar} startIcon={<SearchIcon />}>
                Buscar
            </Button>
        </>
    )
}

export default FiltrosAlojamientos;