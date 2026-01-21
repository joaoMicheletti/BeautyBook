import React, {useState, useEffect} from "react";
import Api from '../../services/api';
import './style_servicos.css';
import {useNavigate} from 'react-router-dom'
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
    const Url = "https://beautybookts-production.up.railway.app/image/";
    const History = useNavigate();
    var cpf_salao = localStorage.getItem('cpf_salao');
    const [ListaServicos, setListaServicos] = useState([]);
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
    useEffect(() =>{
        const Data = {
            cpf_salao,
        };
        Api.post('/servico',Data).then((Response) =>{
            setListaServicos(Response.data);
            console.log(Response)
            console.log(ListaServicos);
        }).catch(() =>{
            alert('Erro ao Buscar Os serviços.')
        });
    }, []);
    //registrar serviço;
    const [servico, setServico] = useState('');
    const [Preco, setprecoServico] = useState('');
    const [tempoServico, setTimeServico] = useState('');
   // const cpf_salao = localStorage.getItem('cpf_salao');
    const Registrar = async (e) => {
        e.preventDefault()
        var preco = parseFloat(Preco, 10);
        const Data = {
            preco, servico, cpf_salao, tempo: parseInt(tempoServico)
        };
        console.log(Data)
        if(servico.length === 0){
            alert('Preencha o campo @Tipo de Serviço');
        } else if(isNaN(preco)){
            alert('Preencha o campo @Preço do serviço');
        } else if(tempoServico === ''){
            alert('Preencha o compo @Duração do cerviço');
        } else{
            Api.post('/servicos', Data).then((Response) =>{
                console.log(Response.data);
                window.location.reload();
            }).catch((erro) =>{
                alert('Erro ao criar um novo serviço.');
            });
        }
    };
    const [infoSalao, setinfoSalao] = useState([]);
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
    // encoler menu 
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
        <div id="PainelSalao">
            {infoSalao.map((iten, key) =>{
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
            <section id="SectionServicosSalao">
                <h1 id="TitleServicos">Serviços</h1>
                <div id='RegistrarServico'>
                    <form id="FormServicos">
                        <p id="ParagrafoRegistrarServico">
                            Tipo de Serviço
                        </p>
                        <input 
                        id="TipodeServico"
                        type="text"
                        placeholder="Tipo De Serviço"
                        onChange={(e) => setServico(e.target.value)}/>
                        
                        <p id="ParagrafoPrecoServico">
                            Preço do Serviço
                        </p>
                        <input
                        id="PrecoServico"
                        type="number"
                        placeholder="Preço do serviço"
                        onChange={(e) => setprecoServico(e.target.value)}/>
                        <br/>
                        <p id="ParagrafoPrecoServico">
                            Duração do serviço
                        </p>
                        <input id="TimeServico" 
                        type="number"
                        placeholder="Tempo de duração em horas EX: 1"
                        onChange={(e) => setTimeServico(e.target.value)}
                        ></input>
                        <button
                        id="BtnServicos"
                        type="submit" onClick={Registrar}>Registrar</button>
                    </form>
                    <hr/>
                    <div id="ServicosCadastrados">
                        {ListaServicos.map((iten, key) =>{
                            //função para editar
                            const Editar = () =>{
                                var Preco = window.prompt('Novo preço para o serviço?. OBS: USE o POPNTO inves de VIRGULA');
                                var preco = parseFloat(Preco, 10);
                                const Data = {
                                    id: iten.id,
                                    preco
                                };
                                if(isNaN(preco)){
                                    alert('Preencha o Campo @Novo preço');
                                }else {
                                    Api.put('/servicos', Data).then((Reponse) =>{
                                        window.location.reload();
                                    }).catch((err) =>{
                                        alert('erro ao Editar Serviço');
                                    });
                                };
                                console.log(Data);
                            };
                            //função para apaga o serviço.
                            const Apagar = () =>{
                                var id = iten.id;
                                const Data = {
                                    id
                                };
                                Api.post('/deletarservicos', Data).then((Reponse) =>{
                                    window.location.reload();
                                }).catch((err) =>{
                                    alert('erro ao apagsr Serviço');
                                });
                            };
                            return(
                                <ul key={iten.id}>
                                    <li>
                                        <p className="PServicoCadastrado">{iten.servico}</p>
                                        <p className="PServicoCadastrado">R${iten.preco}</p>
                                        <button id="BtnEditar" type="submit" onClick={Editar}>Editar</button>
                                        <button id="BtnEditar" type="submit" onClick={Apagar}>Apagar</button>
                                    </li>
                                </ul>
                            );
                        })}
                        
                    </div>
                </div>
            </section>
        </div>
    );
};