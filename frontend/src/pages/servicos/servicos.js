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

export default function Servicos(){
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
            console.log(ListaServicos);
        }).catch(() =>{
            alert('Erro ao Buscar Os serviços.')
        });
    }, []);
    //registrar serviço;
    const [servico, setServico] = useState('');
    const [Preco, setprecoServico] = useState('');
   // const cpf_salao = localStorage.getItem('cpf_salao');
    const Registrar = async (e) => {
        e.preventDefault()
        var preco = parseFloat(Preco, 10);
        const Data = {
            preco, servico, cpf_salao
        };
        if(servico.length === 0){
            alert('Preencha o campo @Tipo de Serviço');
        } else if(isNaN(preco)){
            alert('Preencha o campo @Preço do serviço');
        } else {
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
                return(
                    <header key={iten.id} id="HeadePainel">
                        <div id="UsserHead">
                            <img id="LogoSalaoPainle" src={Url + iten.logo_salao} alt="LOgoSalão"/>
                        </div>
                        <div className="LinksPage" id="LKpainel">
                            <FaCalendar color="#5e5e74" size={30} />
                            <a href="/painel">Agenda</a>
                        </div>
                        <div className="LinksPage" id="LKservicos">
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
                            <ImExit color="#5e5e74" size={30} />
                            <a onClick={Exit}>Sair</a>
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
                                        alert('Editado, atualiza a pagina!');
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
                                    alert('Deletado, atualiza a pagian!');
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