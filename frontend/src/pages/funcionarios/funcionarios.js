import React from "react";
import Logo from '../assets/Logo.png'
import './style_funcionarios.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function Funcionarios(){
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
                
                <div id="DivFuncionarios" className="DivMenu" style={{backgroundColor: "white"}}>
                    <a id="Funcionarios" className="BtnMenu" href="/funcionarios"><GrUserWorker/></a>
                </div>
                <div className="DivMenu">
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
                <h1 id="TitleFuncionarios">Funcionários</h1>
                <div id="DivCadastroFuncionarios">
                <form id="FormFuncionarios">
                        <p id="ParagrafoRegistrarFuncionarios">
                            Nome Completo
                        </p>
                        <input 
                        id="NomeFuncionario"
                        type="text"
                        placeholder="Nome Do Funcionario"/>
                        <p id="ParagrafoCpfFuncionario">
                            CPF Do Funcionário
                        </p>
                        <input
                        id="CpfFuncionarios"
                        type="number"
                        placeholder="CPF Do Funcionario"/>
                        <br/>
                        <button
                        id="BtnFuncionarios"
                        type="submit">Registrar</button>
                    </form>
                    <hr/>
                    <div id="FuncionariosCadastrados">
                        <ul>
                            <li>
                                <p className="PFuncionariosCadastrado">Nome Do Funcionario</p>
                                <button
                                type="submit"
                                id="BtnVerAgenda">Ver Agenda</button>
                                <button 
                                id="BtnExcluir" 
                                type="submit">Excluir</button>
                            </li>
                        </ul>
                        <ul>
                        <li>
                                <p className="PServicoCadastrado">Nome Do Funcionario</p>
                                <button
                                type="submit"
                                id="BtnVerAgenda">Ver Agenda</button>
                                <button 
                                id="BtnExcluir" 
                                type="submit">Excluir</button>
                            </li>
                        </ul>
                        <ul>
                        <li>
                                <p className="PServicoCadastrado">Nome Do Funcionario</p>
                                <button
                                type="submit"
                                id="BtnVerAgenda">Ver Agenda</button>
                                <button 
                                id="BtnExcluir" 
                                type="submit">Excluir</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};