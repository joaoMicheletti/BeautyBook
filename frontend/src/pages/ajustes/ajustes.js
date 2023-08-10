import React, {useState, useEffect} from "react";
import Api from '../../services/api';
import Logo from '../assets/Logo.png';
import './style_ajustes.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function Ajustes(){
    //referência do salão.
    const cpf_salao = localStorage.getItem('cpf_salao');
    //useEffect primeira função a ser ezecutada.
    //essa função fica responsavel por trazer algunsa dados para serem apresentados nos placeholder
    const [listaSalao, setListaSalao] = useState([]);
    useEffect(() => {
        const Data = {cpf_salao};
        Api.post('/buscarsalao', Data).then((Response) => {
            setListaSalao(Response.data);
        }).catch((Erro) => {
            alert('Erro ao buscar informações do Salão.');
        });
    }, []);
    //logo do salão.
    const [image , setimage] = useState('');
    const Logoimg = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('image', image);

        const headers = { 
            'headers': {
                'content-Type': 'multipart/form-data',
            }
        };
        await Api.post('/logo', formdata, headers).then(async(Response) => {
            
            const Data = {
                cpf_salao, logo_salao: Response.data
            };
            await Api.post('/logosalao', Data).then((Res) => {
                console.log(Res.data);
                if(Res.data > 0){
                    alert('imagem salva com sucesso, atualize a pagina!');
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

    //intervalo_entre_agendamentos.
    const [intervalo_entre_agendamentos, setIntervalo] = useState('');
    const Intervalo = async (e) => {
        e.preventDefault();
        const Data = {
            cpf_salao, intervalo_entre_agendamentos
        };

        if(intervalo_entre_agendamentos === ''){
            alert('Defina com minutos o intervalo .');
        } else {
            await Api.post('/intervalo', Data).then((Response) => {
                if(Response.data === 'Intervalo definido!'){
                    alert(Response.data);
                } else {
                    alert('erro ao definir o intervalo');
                };
            }).catch((Erro) => {
                alert('Erro ao auterar o intervalo entre agendamentos.');
            });
        };        
    };
    // Evitando agendamento encima da hora.
    const [agendamento_apos_hora_atual, setCimaHora] = useState('');
    const Cimahora = async (e) => {
        e.preventDefault();
        const Data = {
            cpf_salao, agendamento_apos_hora_atual
        };
        if(agendamento_apos_hora_atual === ''){
            alert('Defina um praso com minutos');
        } else {
            await Api.post('/cimahora', Data).then((Response) =>{
                alert(Response.data);
            }).catch((Erro) =>{
                alert('Erro ao definir.');
            });
        };
    };
    // agendamentos futuros.
    const [permitir_agendamento_ate, SetPermitir] = useState('');
    const AgendamentoAte = async (e) => {
        e.preventDefault();
        const Data = {
            cpf_salao, permitir_agendamento_ate
        };
        if(permitir_agendamento_ate === ''){
            alert('Defina o prazo para agendamentos futuros');
        } else {
            await Api.post('/agendamentoate ', Data).then((Response) => {
                alert(Response.data);
            }).catch((Erro) => {
                alert("Erro ao definir");
            });
        };
    };
    //alterar Senha Salão.
    const [senha, setSenha] = useState('');
    const [CSenha, setCSenha] = useState('');
    const Pass = async (e) => {
        e.preventDefault();
        const Data = {
            cpf_salao, senha
        };
        if(senha === ''){
            alert('Preencha o campo #Senha.');
        } else if(CSenha === ''){
            alert('Preencha o Campo Confirmar Nova Senha');
        } else if(CSenha === senha){
            await Api.post('/pass ', Data).then((Response) => {
                if(Response.data === 'Atualizado...'){
                    alert('Senha alterada com sucesso!');
                } else {
                    alert('Algo nção saiu como esperado.');
                };
            }).catch((Erro) => {
                alert('Erro ao Editar Senha.');
            });
        } else {
            alert('as Senha não corresponden.');
        };
    };
    //editar cadastro do salão;
    const [nome_salao, setNome] = useState('');
    const [endereco,  setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    const MeuCadastro = async (e) => {
        e.preventDefault();
        const Data = {
            nome_salao, endereco, cep, email, cpf_salao
        };
        if(nome_salao === ''){
            alert('preencha o campo Nome Estabelecimento.');
        } else if(endereco === ''){
            alert('Preencha o campo endereço estabelecimento.');
        } else if(cep === ''){
            alert('Preencha oi campo CEP.');
        } else if(email === ''){
            alert('Reencha o campo Email.');
        } else{
            await Api.post('/editarsalao', Data).then((Response) => {
                alert(Response.data);
            }).catch((Erro) => {
                alert('Erro ao Editar Dados Cadastrais.');
            });
        };
    };
    //alterar senha do funcionário.
    const [SenhaFuncionario, setSenhaFuncionario] = useState('');
    const [csenhaFuncionario, setCSenhaFuncionario] = useState('');
    const [cpf_funcionario, setCpfFuncionario] = useState('');
    const FuncionarioSenha = async (e) =>{
        e.preventDefault();
        const Data = {
            senha: SenhaFuncionario,
            cpf_salao,
            cpf_funcionario
        };
        if(cpf_funcionario === ''){
            alert('Preencha o campo Cpf Funcionário');
        } else if(SenhaFuncionario === ''){
            alert('Preencha o campo Senha.');
        } else if(csenhaFuncionario === ''){
            alert('Preencha o campo Confirmar senha.');
        } else {
            await Api.post('/passfuncionarios', Data).then((Response) => {
                if(Response.data > 0) {
                    alert('Senha Alterada com sucesso.');
                }
            }).catch((Erro) => {
                alert('Erro ao Editar Senha do Funcionário');
            });
        }
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
                
                <div id="DivFuncionarios" className="DivMenu" >
                    <a id="Funcionarios" className="BtnMenu" href="/funcionarios"><GrUserWorker/></a>
                </div>
                <div className="DivMenu" >
                    <a id="Horarios" className="BtnMenu" href="/funcionamento"><FcAlarmClock/></a>
                </div>
                <div className="DivMenu" >
                    <a id="ConvidarCliente" className="BtnMenu" href="/convidarcliente"><FcInvite/></a>                   
                </div>
                <div className="DivMenu" style={{backgroundColor: "white"}}>
                    <a id="Ajustes" className="BtnMenu" href="/ajustes"><FcSettings/></a>                    
                </div>
            </div>
            {listaSalao.map((iten, key) => {
                return(
                    <section key={iten.id} id="SectionAgendaSalao">
                        <h1 id="TitleAjustes">Preferências</h1>
                        <div id="AjustesImg" >
                            <p id="ParagrafoImg" >Adicionar / Editar Logo do salão</p>
                            <input  
                            type="file"  
                            className="BtnImg"
                            accept=".jpg, , .jpeg, .png" 
                            onChange={(e) => setimage(e.target.files[0])}/>
                            <button
                            type="submit"
                            className="BtnImg"
                            onClick={Logoimg}>Adicionar | Editar</button>
                        </div>
                        <hr/>
                        <div id="Preferencias">
                            <p className="PPreferecias">Defina sua preferência de intervalos de marcação 
                                de horários para sua agenda. Este intervalo 
                                também é aplicado no agendamento online para clientes.
                            </p>
                            <br/>
                            <p className="PPreferecias">
                                Defina com "minutos"
                            </p>
                            <input
                            id="Minutos"
                            type="number"
                            placeholder={iten.intervalo_entre_agendamentos + '  minutos'}
                            onChange={(e) => setIntervalo(e.target.value)}></input>
                            <br/>
                            <br/>
                            <button
                            id="BtnMinutos"
                            type="submit"
                            onClick={Intervalo}>Definir</button>
                            <hr/>
                            <h2 id="TitlePreferencias">Evitando Agendamentos encima da Hora</h2>
                            <br/>
                            <ul>
                                <li>
                                    <p className="PPreferecias">
                                        Não será mostrado aos clientes Horários até :
                                    </p>
                                    <input
                                    id="MinutosCima"
                                    type="number"
                                    placeholder={iten.agendamento_apos_hora_atual + '  minutos'}
                                    onChange={(e) => setCimaHora(e.target.value)}></input>
                                    <p className="PPreferecias">Após o horário atual.</p>
                                    <button
                                    type="submit"
                                    id="DefinirCimaHora" onClick={Cimahora}>Definir</button>

                                </li>
                            </ul>
                            <ul>
                                <li>
                                    
                                    <p className="PPreferecias">
                                    Permitir que os clientes gravem agendamentos para até daqui: 
                                    </p>
                                    <input
                                    id="MinutosCima"
                                    type="number"
                                    placeholder={iten.permitir_agendamento_ate + '  dias'}
                                    onChange={(e) => SetPermitir(e.target.value)}></input>
                                    <p className="PPreferecias">Após a Data atual.</p>
                                    <button
                                    type="submit"
                                    id="DefinirCimaHora" onClick={AgendamentoAte}>Definir</button>

                                </li>
                            </ul><br/>
                            <hr/>                    
                            <br/>
                            <div id="Senha">
                                <h2 id="TitleSenha">Alterar Senha</h2>
                                <form id="FormSenha">
                                    <p className="PFormSenha">
                                    Nova Senha
                                    </p>
                                    <input
                                    className='InputFormSenha'
                                    type="password"
                                    placeholder="Nova Senha"
                                    onChange={(e) => setSenha(e.target.value)}></input>
                                    <p className="PFormSenha">
                                    Confirnmar Nova Senha
                                    </p>
                                    <input
                                    className='InputFormSenha'
                                    type="password"
                                    placeholder="Confirmar Nova Senha"
                                    onChange={(e) => setCSenha(e.target.value)}></input>
                                    <br/>
                                    <button 
                                    id="BtnFormSenha"
                                    type="submit" onClick={Pass}>Editar</button>
                                </form>

                            </div>
                            <hr/>
                            <br/>
                            <div id="Cadastro" >
                                <h2 id="TitleCadastro">Meu Cadastro</h2>
                                <form>
                                    <p className="PCadastro">
                                        Nome Estabelecimanrto
                                    </p>
                                    <input 
                                    className="InputCadastro"
                                    type="text"
                                    placeholder="Nome Do Estabelecimento"
                                    onChange={(e) => setNome(e.target.value)}></input>
                                    <p className="PCadastro">
                                        Endereço estabelecimento
                                    </p>
                                    <input 
                                    className="InputCadastro"
                                    type="text"
                                    placeholder="Endereço Do Estabelecimento"
                                    onChange={(e) => setEndereco(e.target.value)}></input>
                                    <p className="PCadastro">
                                        CEP estabelecimento
                                    </p>
                                    <input 
                                    className="InputCadastro"
                                    type="text"
                                    placeholder="CEP Do Estabelecimento"
                                    onChange={(e) => setCep(e.target.value)}></input>
                                    <p className="PCadastro">
                                        Email
                                    </p>
                                    <input 
                                    className="InputCadastro"
                                    type="email"
                                    placeholder="E-mail"
                                    onChange={(e) => setEmail(e.target.value)}></input>
                                    <br/>
                                    <button
                                    id="BtnCadastro"
                                    type="submit"
                                    onClick={MeuCadastro}>Editar</button>
                                </form>
                            </div>
                            <hr/>
                            <div id="EditarSenhaFuncionario">
                                <h2 id="TitleEditarSenhaFuncionario">Editar Senha de Funcionários</h2>
                                <form>
                                    <p className="EditarSenhaFuncionario">
                                        CPF do Funcionário
                                    </p>
                                    <input className="InputEditarSenhaFuncionario"
                                    type="text"
                                    placeholder="CPF do funcionário"
                                    onChange={(e) => setCpfFuncionario(e.target.value)}></input>

                                    <p className="EditarSenhaFuncionario">
                                        Nova Senha
                                    </p>
                                    <input className="InputEditarSenhaFuncionario"
                                    type="password"
                                    placeholder="Nova Senha"
                                    onChange={(e) => setSenhaFuncionario(e.target.value)}></input>
                                    <p className="EditarSenhaFuncionario">
                                        Confirmar Nova Senha
                                    </p>
                                    <input className="InputEditarSenhaFuncionario"
                                    type="password"
                                    placeholder="confirmarNova Senha"
                                    onChange={(e) => setCSenhaFuncionario(e.target.value)}></input>
                                    <br/>
                                    <button id="BtnEditarSenhaFuncionario"
                                    onClick={FuncionarioSenha}>
                                        Editar
                                    </button>
                                </form>
                            </div>
                            <hr/>
                            <div id="Plano">
                                <h2 id="TitlePlanos">Planos</h2>
                                <p id="TextoPlano">                    
                                OBS: Os planos só poderão sofrer alterações após 3 meses de assinatura . 
                                </p>
                                <p>Ver os Planos : </p>
                                <a href="/planos">Clik aqui</a>
                            </div>
                        </div>
                        
                    </section>
                );
            })}
            
        </div>
    );
};