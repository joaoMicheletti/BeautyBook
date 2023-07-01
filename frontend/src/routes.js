import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import RegistroSalao from './pages/RegistroSalao/RegistroSalao';
import LoginSalao from './pages/LoginSalao/LoginSalao';
import Paninel from './pages/painel/painel';
import Servicos from './pages/servicos/servicos';
import Funcionarios from './pages/funcionarios/funcionarios';
import HorarioFuncionamento from './pages/horariofuncionamento/horariofuncionamento';
import ConvidarCliente from './pages/convidarcliente/convidarcliente';
import Ajustes from './pages/ajustes/ajustes';
import Agendamento from './pages/agendamento/agendamento'; 
import Agendamentofuncionario from './pages/agendamentofuncionario/agendametofuncionario.js';
//criar rota pqra buscar um salão atraves da url routeparams 
import Planos from './pages/planos/planos'; 
import NotFound from './pages/404/NotFound.js';
export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/agendamento' element={<Agendamento/>} />
                <Route path='/agendamentofuncionario' element={<Agendamentofuncionario/>}/>
                <Route path='/registrosalao' element={<RegistroSalao/>}/>
                <Route path='/loginsalao' element={<LoginSalao/>}/>
                <Route path='/painel' element={<Paninel/>}/>
                <Route path='/servicos' element={<Servicos/>}/>
                <Route path='/funcionarios' element={<Funcionarios/>}/>
                <Route path='funcionamento' element={<HorarioFuncionamento/>}/>
                <Route path='/convidarcliente' element={<ConvidarCliente/>}/>
                <Route path='/ajustes' element={<Ajustes/>}/>
                <Route path='/planos' element={<Planos/>} />
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Router>
    )

};