import React, {useState, useEffect}from "react";
import {useNavigate } from "react-router-dom";
import Api from     '../../services/api';
import './style_funcionarios.css';

import { FaCalendar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";


export default function Funcionarios(){
    const Url = "https://beautybookts-production.up.railway.app/image/";
    const History = useNavigate();
    const [ListaFuncionarios, setListaFuncionarios] = useState([]);
    const [image , setimage] = useState('');
    //buscando funcionarios cadastrados;
    var cpf_salao = localStorage.getItem('cpf_salao');
    Api.post('/assinatura', {cpf_salao}).then((Response) => {
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
            cpf_salao
        };
        Api.post('/funcionarios', Data).then((Response) =>{
            setListaFuncionarios(Response.data);
        }).catch((erro) =>{
            alert('Erro ao Buscar os Funcionários Registrado');
        })
    }, []);
    //função para Registrar Funcionários;
    const [nome_completo, setNome_completo] = useState('');
    const [cpf_funcionario, setCpfFuncionario] = useState('');
    const [senha, setSenha] = useState('');
    const [csenha, setCsenha] = useState('');
    // função para registrar funcionário
    const Registrar = async (e) => {
        e.preventDefault();
        
        if(nome_completo.length === 0){
            alert('Preencha o Campo @Nome Completo');
        } else if(cpf_funcionario.length === 0 ){
            alert('Preencha o Campo @CPF Do Funcionário');
        } else if(cpf_funcionario.length < 11){
            alert('Cpf Inválido');
        } else if(cpf_funcionario.length > 11){
            alert('Cpf Inválido');
        } else if(senha.length === 0){
            alert('Preencha o campo @Senha');
        } else if(csenha.length === 0){
            alert('Preencha o campo @Confirmar Senha');
        }else if(csenha === senha){
            var cpf_salao = localStorage.getItem('cpf_salao');
            const Data = {
                nome_completo,
                cpf_funcionario,
                cpf_salao,
                senha
            };
            Api.post('/funcionario', Data).then((Response) => {
                console.log(Response.data.res);
                if(Response.data.res === 'Contrate um plano para cadastrar seus funcionáriuos.'){
                    console.log(Response.data.res);                }
                if(Response.data.res === 'você exedeu o limite de funcionários cadastrado'){
                    alert('seu plano não permite cadastrar mais funcionários');
                } else if(Response.data === 'Seu Plano não permite cadastrar Funcionários'){
                    alert(Response.data);
                } else {
                    //window.location.reload();
                }
            }).catch((Erro) => {
                alert('Erro ao Registrar Funcionário');
            });
        }else {
            alert('As Senha não Correponden.');
        };
    };
    const [infoSalao, setinfoSalao] = useState([]);
    // buscando informações do salão;
    useEffect(() => {
        Api.post('/buscarsalao', {cpf_salao}).then((Response) => {
            setinfoSalao(Response.data);
        }).catch((Erro) =>{
            alert('erro ao buscar oformações do salão');
        });
    }, []);
    
    //função para sair do painel do salão;
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
                        <div className="LinksPage" id="LKfuncionarios">
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
            <section id="SectionFuncionariosSalao">
                <h1 id="TitleFuncionarios">Funcionários</h1>
                <div id="DivCadastroFuncionarios">
                <form id="FormFuncionarios">
                    <p id="ParagrafoRegistrarFuncionarios">
                        Nome Completo
                    </p>
                    <input 
                    id="NomeFuncionario"
                    type="text"
                    placeholder="Nome Do Funcionario"
                    onChange={(e) => setNome_completo(e.target.value)}/>
                    <p id="ParagrafoCpfFuncionario">
                        CPF Do Funcionário
                    </p>
                    <input
                    id="CpfFuncionarios"
                    type="number"
                    placeholder="CPF Do Funcionario"
                    onChange={(e) => setCpfFuncionario(e.target.value)}/>
                    <br/>
                    <p id="PSenhaFuncionarios">
                        Senha para o Funcionario
                    </p>
                    <input
                    id="SenhaFuncionarios"
                    type="password"
                    placeholder="Senha para o funcionario"
                    onChange={(e) => setSenha(e.target.value)}/>
                    <br/>
                    <p id="PSenhaFuncionarios">
                        Confirmar Senha
                    </p>
                    <input
                    id="SenhaFuncionarioss"
                    type="password"
                    placeholder="confirmar Senha"
                    onChange={(e) => setCsenha(e.target.value)}/>
                    <br/>
                    <button
                    id="BtnFunc"
                    type="submit" onClick={Registrar}>Registrar</button>
                </form>
                    <hr/>
                    <div id="FuncionariosCadastrados">
                        {ListaFuncionarios.map((iten, key) =>{
                            //ver a agenda do funcionário;
                            const VerAgenda = () => {
                                console.log("ver aagenda ");
                                localStorage.setItem('cpf_funcionario', iten.cpf_funcionario);
                                History('/agendaF');
                            };
                            //função para deletar funcinário;
                            const Deletar = () => {
                                var cpf_salao = parseInt(localStorage.getItem('cpf_salao'), 10);
                                var cpf_funcionario = iten.cpf_funcionario;
                                const Data = {
                                    cpf_funcionario, cpf_salao
                                };
                                Api.post('/deletarfuncionario', Data).then((Response) =>{
                                    
                                    window.location.reload();
                                }).catch((erro) =>{
                                    alert('Erro ao deletar o Funcionário');
                                })
                                console.log(Data);
                            };
                            // Função para editar a imagem do funcionário / editar a imagem.
                            async function EditImage(cpf_funcionario){
                                console.log(cpf_funcionario, "cpf do funcionario para editar a img");
                                 
                                const formdata = new FormData();
                                formdata.append('image', image);
                                const headers = { 
                                    'headers': {
                                        'content-Type': 'multipart/form-data',
                                    }
                                };
                                // verificar se temos a img no input
                                if(image === ''){
                                    alert('Selecione uma imagem para alterar.');
                                    return;
                                }
                                // salvar a  img no banco de dados 
                                await Api.post('/logo', formdata, headers).then(async(Response) => {
                                    const Data = {
                                        cpf_funcionario: cpf_funcionario, logo_salao: Response.data.filename
                                    };
                                    console.log(Data, "dados retornados ao salvar a img ");
                                    
                                    await Api.post('/logosalao', Data).then((Res) => {
                                        console.log(Res.data);
                                        if(Res.data.list > 0){
                                            
                                            window.location.reload();
                                        } else {
                                            alert('algo não saiu como esperado.');
                                        }
                                    }).catch((Erro) => {
                                        alert('Erro ao salvar a imagem,');
                                    });
                                    // fazer uma req para salvar na tabela salão o nome a imagem 
                                }).catch((Erro) =>{
                                    alert('Erro ao enviar imagem. ');
                                });
                            };
                            return(
                                <ul key={iten.id}>
                                    <li>
                                        <p id="Alerta_Funcionarios"></p>
                                        <div id="imgFuncionarios">
                                            <a ><img id="IMGFuncionario" src={Url+iten.foto_fincionario} alt={iten.cpf_funcionario} /></a>
                                            <input  
                                                type="file"  
                                                className="BtnImg"
                                                accept=".jpg, , .jpeg, .png" 
                                                onChange={(e) => setimage(e.target.files[0])}/>
                                            <button
                                                type="submit"
                                                onClick={() => EditImage(iten.cpf_funcionario)}
                                                >
                                                Editar
                                            </button>
                                        </div>
                                        <div id="infoFincionario">
                                            <p className="PFuncionariosCadastrado">{iten.nome_completo}</p>
                                        </div>                                        
                                        <div id="ButtonsFuncionario">
                                            <button
                                            type="submit"
                                            id="BtnVerAgenda" onClick={VerAgenda} >Ver Agenda</button>
                                            <button 
                                            id="BtnExcluir" 
                                            type="submit" onClick={Deletar}>Excluir</button>
                                        </div>
                                        
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