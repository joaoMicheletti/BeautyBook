import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroSalao from './pages/RegistroSalao/RegistroSalao';
import LoginSalao from './pages/LoginSalao/LoginSalao';
import Paninel from './pages/painel/painel';
import Servicos from './pages/servicos/servicos';
export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/registrosalao' element={<RegistroSalao/>}/>
                <Route path='/loginsalao' element={<LoginSalao/>}/>
                <Route path='/painel' element={<Paninel/>}/>
                <Route path='/servicos' element={<Servicos/>}/>
            </Routes>
        </Router>
    )

};