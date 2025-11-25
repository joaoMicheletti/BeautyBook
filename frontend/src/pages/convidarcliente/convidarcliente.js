import React, {useEffect, useState}from "react";
import Api from "../../services/api";
import './style_convidar.css';
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";


export default function Servicos(){
    const Url = "https://beautybookts-production.up.railway.app/image/"; // trocar link da pagina LK
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
                    <header key={iten.id} id="HeadePainel">
                                                                <div id="UsserHead">
                                                                    <img id="LogoSalaoPainle" src={Url + iten.logo_salao} alt="LOgoSalão"/>
                                                                </div>
                                                                <div className="LinksPage" id="LKpainel">
                                                                    <FaCalendar color="#5e5e74" size={30} />
                                                                    <a href="/painel">Agenda</a>
                                                                </div>
                                                                <div className="LinksPage">
                                                                    <MdOutlineMiscellaneousServices color="#5e5e74" size={30} />
                                                                    <a href="/servicos">Serviços</a>
                                                                </div>
                                                                <div className="LinksPage">
                                                                    <IoIosPeople color='#5e5e74' size={30} />
                                                                    <a href="/funcionarios">Funcionários</a>
                                                                </div>
                                                                <div className="LinksPage">
                                                                
                                                                    <FaClock  color='#5e5e74' size={30} />
                                                                    <a href="/funcionamento">Horários</a>
                                                                </div>
                                                                <div className="LinksPage">
                                                                    <IoSend color='#5e5e74' size={30} />
                                                                    <a href="/convidarcliente">Indique</a>
                                                                </div>
                                                                <div className="LinksPage">
                                                                    <IoSettings color="#5e5e74" size={30}/>
                                                                    <a href="/ajustes">Ajustes</a>
                                                                </div>
                                                                <div className="LinksPage">
                                                                    <FaClipboardList color="#5e5e74" size={30}/>
                                                                    <a href="/relatorios">Relatorios</a>
                                                                </div>
                                                                <div className="LinksPage">
                                                                    <ImExit color="#5e5e74" size={30} />
                                                                    <a onClick={Exit}>Sair</a>
                                                                </div>
                                                            </header>
                );
            })}
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