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
                         <input id="SelectMes" type="date"></input>
                         <button id="BtnAgenda" type="sybmit">Buscar</button>
                    </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <div id="Agendados">
                    <ul>
                        <li>
                            <p className="UnderLine" >20/06/1998</p>
                            <p>Horário : 15:30</p>
                            <p>Cliente :  Bianca de Andrade Cobra Micheletti</p>
                            <p>WhatsApp Cliente : </p> 
                            <a target="_blank"
                            rel='noreferrer'  
                            href='https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?' 
                            className="LKWhatsapp">11932223533</a>
                            <p>Funcionario :  Joao Victor de Andrade Micheletti</p>
                            <p>Serviços :  Escova chapinha e tudo que há de bom em seguifda tem um churrasco</p>
                            <p className="UnderLine">1.500,00R$</p><br/>
                            <div className="DivStatus">
                                <button className="BtnStatus" >Cancelado</button>
                                <button className="BtnStatus" >finalizado</button>
                            </div>
                        </li>
                    </ul>   
                    <ul>
                        <li>
                            <p className="UnderLine" >20/06/1998</p>
                            <p>Horário : 15:30</p>
                            <p>Cliente :  Bianca de Andrade Cobra Micheletti</p>
                            <p>WhatsApp Cliente : </p> 
                            <a target="_blank"
                            rel='noreferrer'  
                            href='https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?' 
                            className="LKWhatsapp">11932223533</a>
                            <p>Funcionario :  Joao Victor de Andrade Micheletti</p>
                            <p>Serviços :  Escova chapinha e tudo que há de bom em seguifda tem um churrasco</p>
                            <p className="UnderLine">1.500,00R$</p><br/>
                            <div className="DivStatus">
                                <button className="BtnStatus" >Cancelado</button>
                                <button className="BtnStatus" >finalizado</button>
                            </div>
                        </li>
                    </ul>   
                    <ul>
                        <li>
                            <p className="UnderLine" >20/06/1998</p>
                            <p>Horário : 15:30</p>
                            <p>Cliente :  Bianca de Andrade Cobra Micheletti</p>
                            <p>WhatsApp Cliente : </p> 
                            <a target="_blank"
                            rel='noreferrer'  
                            href='https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?' 
                            className="LKWhatsapp">11932223533</a>
                            <p>Funcionario :  Joao Victor de Andrade Micheletti</p>
                            <p>Serviços :  Escova chapinha e tudo que há de bom em seguifda tem um churrasco</p>
                            <p className="UnderLine">1.500,00R$</p><br/>
                            <div className="DivStatus">
                                <button className="BtnStatus" >Cancelado</button>
                                <button className="BtnStatus" >finalizado</button>
                            </div>
                        </li>
                    </ul>   
                    <ul>
                        <li>
                            <p className="UnderLine" >20/06/1998</p>
                            <p>Horário : 15:30</p>
                            <p>Cliente :  Bianca de Andrade Cobra Micheletti</p>
                            <p>WhatsApp Cliente : </p> 
                            <a target="_blank"
                            rel='noreferrer'  
                            href='https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?' 
                            className="LKWhatsapp">11932223533</a>
                            <p>Funcionario :  Joao Victor de Andrade Micheletti</p>
                            <p>Serviços :  Escova chapinha e tudo que há de bom em seguifda tem um churrasco</p>
                            <p className="UnderLine">11.500,00R$00</p> <br/>
                            <div className="DivStatus">
                                <button className="BtnStatus" >Cancelado</button>
                                <button className="BtnStatus"> Finalizado</button>
                            </div>
                        </li>
                    </ul>   

                </div>
            </section>
        </div>
    );
};