import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
//import Logo from '../assets/Logo.png';
//import Cabelo from '../assets/cabelo.jpeg';

export default function Home(){
    return(
        <div className="Home">
            <header className="header">
            <h1>Flowly</h1>
                <nav className="menu">
                    <Link className='LK' to="/init">Agendar</Link>                    
                    <Link className='LK' to="/registrosalao">Registrar-se</Link>
                    <Link className='LK' to="/loginsalao">Login</Link>                    
                </nav>
            </header>
            <div id='content'>
            </div>
        </div>
    );    
}