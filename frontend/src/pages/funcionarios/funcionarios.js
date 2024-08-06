import React, {useState, useEffect}from "react";
import {useNavigate } from "react-router-dom";
import Api from     '../../services/api';
import './style_funcionarios.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';
import{FiLogOut} from 'react-icons/fi';

export default function Funcionarios(){
    const History = useNavigate();
    const [ListaFuncionarios, setListaFuncionarios] = useState([]);
    //buscando funcionarios cadastrados;
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
                console.log(Response.data);
                if(Response.data.res === 'você exedeu o limite de funcionários cadastrado'){
                    alert('seu plano não permite cadastrar mais funcionários');
                } else if(Response.data === 'Desculpe, Seu plano não permite cadastrar funcionários.'){
                    alert(Response.data);
                } else {
                    alert('Funcionário Registrado');
                }
            }).catch((Erro) => {
                alert('Erro ao Registrar Funcionário');
            });
        }else {
            alert('As Senha não Correponden.');
        };
    };
    const [infoSalao, setinfoSalao] = useState([]);
    useEffect(() => {
        Api.post('/buscarsalao', {cpf_salao}).then((Response) => {
            setinfoSalao(Response.data);
        }).catch((Erro) =>{
            alert('erro ao buscar oformações do salão');
        });
    }, []);
    const Url = "http://172.17.3.187:1998/image/";
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
                
                <div id="DivFuncionarios" className="DivMenu" style={{backgroundColor: "white"}}>
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
                <div className="DivMenu">
                    <button  onClick={Exit} id='Agenda' className="Btnexit" href="/painel"><FiLogOut/></button>                    
                </div>
            </div>
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
                                    alert('Deletado com sucesso.');
                                    console.log(Response.data);
                                }).catch((erro) =>{
                                    alert('Erro ao deletar o Funcionário');
                                })
                                console.log(Data);
                            };
                            return(
                                <ul key={iten.id}>
                                    <li>
                                        <p id="Alerta_Funcionarios"></p>
                                        <p className="PFuncionariosCadastrado">{iten.nome_completo}</p>
                                        <button
                                        type="submit"
                                        id="BtnVerAgenda" onClick={VerAgenda} >Ver Agenda</button>
                                        <button 
                                        id="BtnExcluir" 
                                        type="submit" onClick={Deletar}>Excluir</button>
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