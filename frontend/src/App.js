import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import './App.css';

import ReservarAlojamientoPage from './pages/reservarAlojamientoPage/ReservarAlojamientoPage';
import AlojamientoEspecificoPage from './pages/alojamientoEspecificoPage/AlojamientoEspecificoPage';
import AlojamientosPage from './pages/alojamientosPage/AlojamientosPage';
import LoginPage from './pages/loginPage/LoginPage';
import ReservasPage from './pages/reservasPage/ReservasPage';
import Layout from './pages/layout/Layout';
import AgregarAlojamientoPage from './pages/agregarAlojamientoPage/AgregarAlojamientoPage';

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
          <Route path="/reservas/:id" element={<ReservasPage/>} />
          <Route path="/alojamientos/:id/reservar" element={<ReservarAlojamientoPage />} />
          <Route path="/agregar-alojamiento" element={<AgregarAlojamientoPage />} />
        </Route>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;