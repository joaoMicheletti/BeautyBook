import React from "react";
import Logo from '../assets/Logo.png';
import './styleCpanel.css';

export default function Cpanel(){
    return(
        <div id="CpanelContainer">
            <header id="CpanelHeader">
                <img src={Logo} alt="logo"/>
                <nav id="Menu">
                    <a>Log Out</a>
                </nav>
            </header>
            <h1>Painel de Suporte</h1>
            <div id="ConteudoContainer">
                <label>Cpf Do salão:<br/>
                    <input type="text" id="inp" placeholder="Cpf Salão:"/>
                </label>
            </div>
        </div>
    );
}