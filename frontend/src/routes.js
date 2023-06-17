import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroSalao from './pages/RegistroSalao/RegistroSalao';
import LoginSalao from './pages/LoginSalao/LoginSalao';
import Paninel from './pages/painel/painel';
import Servicos from './pages/servicos/servicos';
import Funcionarios from './pages/funcionarios/funcionarios';
import HorarioFuncionamento from './pages/horariofuncionamento/horariofuncionamento';
import ConvidarCliente from './pages/convidarcliente/convidarcliente';
import Ajustes from './pages/ajustes/ajustes';
export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/registrosalao' element={<RegistroSalao/>}/>
                <Route path='/loginsalao' element={<LoginSalao/>}/>
                <Route path='/painel' element={<Paninel/>}/>
                <Route path='/servicos' element={<Servicos/>}/>
                <Route path='/funcionarios' element={<Funcionarios/>}/>
                <Route path='funcionamento' element={<HorarioFuncionamento/>}/>
                <Route path='/convidarcliente' element={<ConvidarCliente/>}/>
                <Route path='/ajustes' element={<Ajustes/>}/>
            </Routes>
        </Router>
    )

};