import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroSalao from './pages/RegistroSalao/RegistroSalao';
import LoginSalao from './pages/LoginSalao/LoginSalao';

export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/registrosalao' element={<RegistroSalao/>}/>
                <Route path='/loginsalao' element={<LoginSalao/>}/>
            </Routes>
        </Router>
    )

};