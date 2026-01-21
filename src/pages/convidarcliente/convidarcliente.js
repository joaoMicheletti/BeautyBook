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
import {LuArrowRightLeft } from "react-icons/lu";

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
    };// encoler menu 
    function encolher() {
        const menus = document.querySelectorAll('.LinksPage');
        const links = document.querySelectorAll('.aLink');

        menus.forEach(menu => {
            const expandido = menu.dataset.expandido === 'true';

            if (expandido) {
                // ENCOLHER MENU
                menu.style.width = '100%';
                menu.dataset.expandido = 'false';

                // ESCONDER TEXTO
                links.forEach(link => {
                    link.style.display = 'none';
                });
            } else {
                // EXPANDIR MENU
                menu.style.width = '100%';
                menu.dataset.expandido = 'true';

                // MOSTRAR TEXTO
                links.forEach(link => {
                    link.style.display = 'block';
                });
            }
        });
    }
    
    return(
        <div id="PainelSalao" className="Convidar">
            {infoSalao.map((iten, key) =>{
                localStorage.setItem('cod', infoSalao[0].codigo_indicacao);
                return(
                    <header key={iten.id} id="HeadePainel">
                        <div id="UsserHead">
                            <img id="LogoSalaoPainle" src={Url + iten.logo_salao} alt="LOgoSalão"/>
                            <LuArrowRightLeft onClick={encolher} className="incoledor" color="#ffffff" size={40}/>
                        </div>
                        <div  className="LinksPage" id="LKpainel">
                            <a href="/painel"> <FaCalendar className="iconbarra" color="#5e5e74" size={30} /></a>
                            <a className='aLink' href="/painel">Agenda</a>
                        </div>
                        <div href="/servicos" className="LinksPage">
                            <a href="/servicos"><MdOutlineMiscellaneousServices className="iconbarra" color="#5e5e74" size={30} /></a>
                            <a className='aLink' href="/servicos">Serviços</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/funcionarios"><IoIosPeople className="iconbarra" color='#5e5e74' size={30} /></a>
                            <a className='aLink' href="/funcionarios">Funcionários</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/funcionamento"><FaClock className="iconbarra"  color='#5e5e74' size={30} /></a>
                            <a className='aLink' href="/funcionamento">Horários</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/convidarcliente"><IoSend className="iconbarra" color='#5e5e74' size={30} /></a>
                            <a className='aLink' href="/convidarcliente">Indique</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/ajustes"><IoSettings className="iconbarra" color="#5e5e74" size={30}/></a>
                            <a className='aLink' href="/ajustes">Ajustes</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/relatorios"><FaClipboardList className="iconbarra" color="#5e5e74" size={30} /></a>
                            <a className='aLink' href="/relatorios">Relatórios</a>
                        </div>
                        <div className="LinksPage">
                            <ImExit className="iconbarra" onClick={Exit}  color="#5e5e74" size={30} />
                            <a className='aLink' onClick={Exit}>Sair</a>
                        </div>
                    </header>
                );
            })}
            <section id="SectionConvidar">
                <h1 id="TitleLinkAgendamento" >Meu Link de Agendamento</h1>
                <div id="InfoLink">
                    <p id="TextInfoLink">
                    Este é o link para que seus clientes agendem com você rapidamente:<br/>
                    https://beautybook-production.up.railway.app/lk/{cpf_salao}
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