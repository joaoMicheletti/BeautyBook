import React, {useState, useEffect} from "react";
import Api from '../../services/api';
import Logo from '../assets/Logo.png'
import './style_servicos.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function Servicos(){
    var cpf_salao = localStorage.getItem('cpf_salao');
    const [ListaServicos, setListaServicos] = useState([]);
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
                alert('Serviço criado com sucesso. Atualiza a pagina');
            }).catch((erro) =>{
                alert('Erro ao criar um novo serviço.');
            });
        }
        console.log(Data);
    };
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
                <div id='DivServicos'className="DivMenu" style={{backgroundColor: "white"}}>
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
                                        <p className="PServicoCadastrado">Valor:</p>
                                        <p className="PServicoCadastrado">{iten.preco}R$</p>
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