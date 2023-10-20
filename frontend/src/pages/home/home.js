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
                    <h4>Beleza Unida, ao Alcance de um Clique.</h4>
                    <br/>
                    <p id='P'>
                        <strong>Descubra a Magia da Beleza! 
                            Com nosso sistema inovador, 
                            você pode explorar uma variedade de salões de beleza, 
                            encontrar os tratamentos perfeitos e reservar sua 
                            transformação pessoal em segundos. Deixe sua jornada de beleza começar aqui. 
                            Faça parte da revolução da beleza!
                        </strong><br/>
                        <br/><a href='/init'>Click aqui</a>
                    </p>
                </div>
            </div>
        </div>
    );    
}