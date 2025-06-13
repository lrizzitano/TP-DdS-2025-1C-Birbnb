import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import AlojamientoEspecificoPage from './pages/alojamientoEspecificoPage/AlojamientoEspecificoPage';
import AlojamientosPage from './pages/alojamientosPage/AlojamientosPage';
import LoginPage from './pages/loginPage/LoginPage';
import HuespedPage from './pages/huespedPage/HuespedPage';
import AnfitrionPage from './pages/anfitrionPage/AnfitrionPage';
import Layout from './pages/layout/Layout';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        {/* esta armado para que estos tengan el mismo layout: header y abajo las cosas
        especificas de cada vista, excepto login. Se puede analizar que queremos que tenga
        cosas en comun (header, footer, etc.) y que no*/}
        <Route path="/" element={<Layout  />} >
          <Route index element={<AlojamientosPage />} />
          <Route path="/alojamientos/:id" element={<AlojamientoEspecificoPage />} />
           {/* habria q ver como gestionamos estas routes de huespedes y anfitriones */}
          <Route path="/huespedes/:id" element={<HuespedPage/>} /> 
          <Route path="/anfitriones/:id" element={<AnfitrionPage/>} />
        </Route>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;