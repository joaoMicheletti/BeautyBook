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
                <div  id='DivAganda' className="DivMenu" style={{backgroundColor: "white"}}>
                    <a id='Agenda' className="BtnMenu" href="/painel"><FcCalendar/></a>
                </div>
                <div className="DivMenu">
                    <a id="Services" className="BtnMenu" href="/servicos"><FcServices/></a>                    
                </div>
                
                <div className="DivMenu">
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
                <h1 id="TitleAgenda">Agenda</h1>
                <div id="ConteinerAgenda">
                    <div id="DiaMesAno">
                    <input id="SelectMes" type="date" value="Selecione a data para ver a agenda"></input>
                    </div>
                    <div id="DiasSemana">
                        <div className="DiaSemana">DOM</div>
                        <div className="DiaSemana">Seg</div>
                        <div className="DiaSemana">Ter</div>
                        <div className="DiaSemana">Quar</div>
                        <div className="DiaSemana">Quint</div>
                        <div className="DiaSemana">Sex</div>
                        <div className="DiaSemana">Sab</div>
                    </div>
                    <div className="DiasNumero">
                        <div className="Numero">
                            <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                        <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                    </div>
                    <div className="DiasNumero">
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                    </div>
                    <div className="DiasNumero">
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                    </div>
                    <div className="DiasNumero">
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                    </div>
                    <div className="DiasNumero">
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                        <div className="Numero">
                             <button type="submit">30</button>
                        </div>
                    </div>
                </div>
                <br/>
                <hr/>
                <br/>
            </section>
        </div>
    );
};