import React from "react";
import Logo from '../assets/Logo.png'
import './style_horario.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function HorarioDeFuncionamento(){
    return(
        <div id="PainelSalao">
            <header id="HeaderSalao">
                <img id="LogoSalao" src={Logo} alt="LOgoSalão"/>
                <h1 id="TitleSalao" >Nome Salão</h1>
            </header>
            <hr/>
            <div id="ButtonsMenuSalao">
                <div id='DivAganda' className="DivMenu">
                    <a id='Agenda' className="BtnMenu" href="/painel"><FcCalendar/></a>
                </div>
                <div id='DivServicos'className="DivMenu">
                    <a id="Services" className="BtnMenu" href="/servicos"><FcServices/></a>                    
                </div>
                
                <div id="DivFuncionarios" className="DivMenu" >
                    <a id="Funcionarios" className="BtnMenu" href="/funcionarios"><GrUserWorker/></a>
                </div>
                <div className="DivMenu" style={{backgroundColor: "white"}}>
                    <a id="Horarios" className="BtnMenu" href="/funcionamento"><FcAlarmClock/></a>
                </div>
                <div className="DivMenu">
                    <a id="ConvidarCliente" className="BtnMenu" href="/convidarcliente"><FcInvite/></a>                   
                </div>
                <div className="DivMenu">
                    <a id="Ajustes" className="BtnMenu" href="/ajustes"><FcSettings/></a>                    
                </div>
            </div>
            <section id="SectionAgendaSalao">
                <h1 id='TitleHorarios'>Horário de funcionamento</h1>
                <div id="DivHorarios">
                    <ul>
                        <li>
                            <p className="DiaSemana">Segunda-Feira</p>
                            <p className="DiaSemana">Abre</p>
                            <p className="DiaSemana">Fecha</p>
                            <button
                            type="submit"
                            className="BtnHorario"
                            >Editar</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="DiaSemana">Terça-Feira</p>
                            <p className="DiaSemana">Abre</p>
                            <p className="DiaSemana">Fecha</p>
                            <button
                            type="submit"
                            className="BtnHorario"
                            >Editar</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="DiaSemana">Quarta-Feira</p>
                            <p className="DiaSemana">Abre</p>
                            <p className="DiaSemana">Fecha</p>
                            <button
                            type="submit"
                            className="BtnHorario"
                            >Editar</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="DiaSemana">Quinta-Feira</p>
                            <p className="DiaSemana">Abre</p>
                            <p className="DiaSemana">Fecha</p>
                            <button
                            type="submit"
                            className="BtnHorario"
                            >Editar</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="DiaSemana">Sexta-Feira</p>
                            <p className="DiaSemana">Abre</p>
                            <p className="DiaSemana">Fecha</p>
                            <button
                            type="submit"
                            className="BtnHorario"
                            >Editar</button>                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="DiaSemana">Sabado</p>
                            <p className="DiaSemana">Abre</p>
                            <p className="DiaSemana">Fecha</p>
                            <button
                            type="submit"
                            className="BtnHorario"
                            >Editar</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="DiaSemana">Domingo</p>
                            <p className="DiaSemana">Abre</p>
                            <p className="DiaSemana">Fecha</p>
                            <button
                            type="submit"
                            className="BtnHorario"
                            >Editar</button>
                        </li>
                    </ul>
                    
                </div>
            </section>
        </div>
    );
};