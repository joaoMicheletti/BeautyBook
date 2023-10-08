import React, {useEffect, useState}from "react";
import Api from "../../services/api";
import './style_convidar.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
import{FiLogOut} from 'react-icons/fi';

export default function Servicos(){
    const History = useNavigate();
    const [infoSalao, setinfoSalao] = useState([]);
    var cpf_salao = localStorage.getItem('cpf_salao');
    Api.post('/assinatura', {cpf_salao}).then((Response) => {
        if(Response.data[0].assinatura_status != 'on'){
            alert('Sua assinatura expirou, contrate nosso serviço novamente.');
            History('/planos')
        }
    }).catch((Erro) => {
        alert('Erro ao validar sua assinatura!');
    });
    useEffect(() => {
        Api.post('/buscarsalao', {cpf_salao}).then((Response) => {
            setinfoSalao(Response.data);
        }).catch((Erro) =>{
            alert('erro ao buscar oformações do salão');
        });
    }, []);
    const Url = "http://127.0.0.1:1998/image/";
    const Exit = (e) => {
        e.preventDefault();
        localStorage.removeItem(cpf_salao);
        alert('Até breve');
        History('/loginsalao');
    };
    
    return(
        <div id="PainelSalao">
            {infoSalao.map((iten, key) =>{
                localStorage.setItem('cod', infoSalao[0].codigo_indicacao);
                return(
                    <header key={iten.id} id="HeaderSalao">
                        <img id="LogoSalao" src={Url + iten.logo_salao} alt="LOgoSalão"/>
                        <h1 id="TitleSalao" >{iten.nome_salao}</h1>
                    </header>
                );
            })}
            <hr/>
            <div id="ButtonsMenuSalao">
                <div id='DivAganda' className="DivMenu" style={{backgroundColor: "transparent"}}>
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
                <div className="DivMenu">
                    <button  onClick={Exit} id='Agenda' className="Btnexit" href="/painel"><FiLogOut/></button>                    
                </div>
            </div>
            <section id="SectionAgendaSalao">
                <h1 id="TitleLinkAgendamento" >Meu Link de Agendamento</h1>
                <div id="InfoLink">
                    <p id="TextInfoLink">
                    Este é o seu link para seus clientes agendarem com você 
                    rapidamente :<br/>
                    https://dominio/lk/{cpf_salao}
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
                    Aqui  está seu código de indicação : {localStorage.getItem('cod')}<br/>
                    Com ele você ganha alguns  benefícios  como, descontos na  próxima parcela.<br/>
                    Porem o benefício será valido para o seu estabelecimento quando o indicado contratar um dos nossos planos.<br/>
                    <br/>                    
                    BENEFÍCIOS :<br/> 
                    desconto de até 50% na proxima mensalidade!
                    </p>
                </div>
            </section>
        </div>
    );
};