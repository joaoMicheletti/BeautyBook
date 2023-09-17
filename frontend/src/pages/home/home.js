import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
//import Logo from '../assets/Logo.png';
//import Cabelo from '../assets/cabelo.jpeg';

export default function Home(){
    return(
        <div className="Home">
            <header className="header">
            <h1>BeautyBook</h1>
                <nav className="menu">
                    <Link className='LK' to="/loginsalao">Login_Salão</Link>
                    <Link className='LK' to="/registrosalao">Registrar_Salão</Link>
                    <Link className='LK' to="/init">Agendar Horário</Link>
                </nav>
            </header>
            <div id='content'>
                <div id='slogan'>
                    <br/>
                    <h4>BeutyBook®<br/> Onde a Beleza se Encontra</h4>
                    <br/>
                    <p>
                        agende um Horário comm um de nossos saloẽs cadastrados.<br/>
                        <br/><a href='/init'>Click aqui</a>
                    </p>
                </div>
            </div>
        </div>
    );    
}