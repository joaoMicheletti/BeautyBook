import React from "react";
import Logo from '../assets/Logo.png'
import './style.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function Painel(){
    return(
        <div id="PainelSalao">
            <header id="HeaderSalao">
                <img id="LogoSalao" src={Logo} alt="LOgoSalão"/>
                <h1 id="TitleSalao" >Nome Salão</h1>
            </header>
            <hr/>
            <div id="ButtonsMenuSalao">
                <div className="DivMenu">
                    <a id='Agenda' className="BtnMenu" href="/"><FcCalendar/></a>
                </div>
                <div className="DivMenu">
                    <a id="Services" className="BtnMenu" href="/"><FcServices/></a>                    
                </div>
                
                <div className="DivMenu">
                    <a id="Funcionarios" className="BtnMenu" href="/"><GrUserWorker/></a>
                </div>
                <div className="DivMenu">
                    <a id="Horarios" className="BtnMenu" href="/"><FcAlarmClock/></a>
                </div>
                <div className="DivMenu">
                    <a id="ConvidarCliente" className="BtnMenu" href="/"><FcInvite/></a>                   
                </div>
                <div className="DivMenu">
                    <a id="Ajustes" className="BtnMenu" href="/"><FcSettings/></a>                    
                </div>
                
                
            </div>
        </div>
    );
};