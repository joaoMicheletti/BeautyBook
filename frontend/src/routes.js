import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroSalao from './pages/RegistroSalao/RegistroSalao';

export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/registrosalao' element={<RegistroSalao/>}/>
            </Routes>
        </Router>
    )

};