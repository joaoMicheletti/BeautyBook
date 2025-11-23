import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logoprovisor.webp';
import Mokup from  '../assets/homeimg.webp';
import './home.css';
//import Logo from '../assets/Logo.png';
//import Cabelo from '../assets/cabelo.jpeg';

export default function Home(){
    return(
        <div className="Home">
            <header className="header">
                <img className='logoTemp' src={Logo} alt='teste de logotipo'/>
                <nav className="menu">
                    <Link className='LK' to="/">Home</Link> 
                    <Link className='LK' to="/init">Parceiros</Link>                    
                    <Link className='LK' to="/registrosalao">Registrar-se</Link>
                    <Link className='LK' to="/loginsalao">Login</Link>                    
                </nav>
            </header>
            <div id='content'>
                <div className='textHome'>
                    <h1>Onde os negócios ficam mais fluidos</h1>
                    <p>
                        Crie uma experiência perfeita para o cliente
                        e automatize as operações diárias com o software de 
                        gerenciamento com a maior avaliação do mercado.
                    </p>
                    <Link className='btnHome' to="/registrosalao">Comece Agora</Link>
                </div>
                <div className='imgHome'>
                    {/*<img src={Cabelo} alt='imagem de cabelo'/>*/}
                    <img src={Mokup} alt='imagem de cabelo'/>
                </div>
            </div>
        </div>
    );    
}