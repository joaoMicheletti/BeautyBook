import React, {useState, useEffect}from "react";
import Api from     '../../services/api';
import Logo from '../assets/Logo.png'
import './style_funcionarios.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function Funcionarios(){
    const [ListaFuncionarios, setListaFuncionarios] = useState([]);
    //buscando funcionarios cadastrados;
    useEffect(() =>{
        var cpf_salao = localStorage.getItem('cpf_salao');
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
                if(Response.data === 'Desculpe, você já excedeu o limite de funcionários cadastrados...'){
                    alert('seu plano não permite cadastrar mais funcionários');
                } else if(Response.data === 'Contrate um plano para registrar funcionários.'){
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
            </div>
            <section id="SectionAgendaSalao">
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
                        id="BtnFuncionarios"
                        type="submit" onClick={Registrar}>Registrar</button>
                    </form>
                    <hr/>
                    <div id="FuncionariosCadastrados">
                        {ListaFuncionarios.map((iten, key) =>{
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
                                        id="BtnVerAgenda">Ver Agenda</button>
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