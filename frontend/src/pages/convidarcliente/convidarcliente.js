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
        console.log(Response);
        if(Response.data === false){
            alert('Seus dias de acesso livre a plataforma acabaram, contrate um plano.');
            History('/planos')
        } else if(Response.data === true){
            console.log(Response.data);
        } else if(Response.data === null){
            alert('Seu plano encontra-se "Expirado", regularize para ter acesso a plataforma.')
            History('/planos')
        };
    }).catch(() => {
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
        <div id="PainelSalao" className="Convidar">
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
            <section id="SectionConvidar">
                <h1 id="TitleLinkAgendamento" >Meu Link de Agendamento</h1>
                <div id="InfoLink">
                    <p id="TextInfoLink">
                    Este é o link para que seus clientes agendem com você rapidamente:<br/>
                    https://useful-incredibly-goldfish.ngrok-free.app/lk/{cpf_salao}
                    <br/>
                    Coloque este link na sua página do Facebook, Instagram (no perfil e na resposta automática do WhatsApp Business), no chatbot do Messenger, nas informações de localização do seu estabelecimento no Google Maps, e em todos os lugares onde você tenha publicidade online. Distribua este link em todos os canais de divulgação.
                    </p>
                </div>
                <br/>
                <div id="CodigoIndicação">
                    <h2 id="TitleCodigoIndicação" >Indique e Ganhe.</h2>
                    <br/>
                    <p id="pCodigoIndicação" >
                    Aqui está o seu código de indicação: {localStorage.getItem('cod')}<br/>
                    Com ele, você ganha alguns benefícios, como descontos na próxima parcela.
                    Porém, o benefício será válido para o seu estabelecimento quando o indicado contratar um dos nossos planos.<br/>
                    <br/>                    
                    BENEFÍCIOS:<br/> 
                    Desconto de até 40% na próxima mensalidade caso o plano sejá mensal.<br/>
                    Desconto de até 50% ao renovar assinatura anoal.
                    </p>
                </div>
            </section>
        </div>
    );
};