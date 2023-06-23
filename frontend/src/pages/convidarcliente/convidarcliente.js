import React from "react";
import Logo from '../assets/Logo.png'
import './style_convidar.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function Servicos(){
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
                <div className="DivMenu" >
                    <a id="Horarios" className="BtnMenu" href="/funcionamento"><FcAlarmClock/></a>
                </div>
                <div className="DivMenu" style={{backgroundColor: "white"}}>
                    <a id="ConvidarCliente" className="BtnMenu" href="/convidarcliente"><FcInvite/></a>                   
                </div>
                <div className="DivMenu">
                    <a id="Ajustes" className="BtnMenu" href="/ajustes"><FcSettings/></a>                    
                </div>
            </div>
            <section id="SectionAgendaSalao">
                <h1 id="TitleLinkAgendamento" >Meu Link de Agendamento</h1>
                <div id="InfoLink">
                    <p id="TextInfoLink">
                    Este é o seu link para seus clientes agendarem com você 
                    rapidamente :<br/>
                    https://XXXXXXXXXXXXXXX.com
                    <br/>
                    Coloque este link na sua página 
                    do Facebook e Instagram, no perfil e na resposta 
                    automática de seu Whatsapp Business, no chatbot do 
                    seu messenger, nas informações de localização de seu 
                    estabelecimento no Google Maps, e onde mais você tiver 
                    publidade na internet. Distribua este link em todos os 
                    locais de divulgação...
                    </p>
                </div>
                <br/>
                <div id="CodigoIndicação">
                    <h2 id="TitleCodigoIndicação" >Indique e Ganhe.</h2>
                    <br/>
                    <p id="pCodigoIndicação" >
                    Aqui  está seu código de indicação : “”.<br/>
                    Com ele você ganha alguns  benefícios  como, descontos na  próxima parcela.<br/>
                    Porem o benefício será valido para o seu estabelecimento quando o indicado contratar um dos nossos planos.<br/>
                    <br/>                    
                    BENEFÍCIOS :<br/> 
                    Para o Plano Anual seu desconto  na próxima parcela será de : 15%.
                    <br/>
                    Para o Plano Mensal se desconto na próxima parcela será de : 25%
                    </p>
                </div>
            </section>
        </div>
    );
};