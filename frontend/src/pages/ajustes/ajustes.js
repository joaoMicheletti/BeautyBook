import React, {useState, useEffect} from "react";
import Api from '../../services/api';
//import Logo from '../assets/Logo.png';
import './style_ajustes.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings, FcBullish} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
import{FiLogOut} from 'react-icons/fi';

export default function Ajustes(){
    const History = useNavigate();
    //referência do salão.
    const cpf_salao = localStorage.getItem('cpf_salao');
    //useEffect primeira função a ser ezecutada.
    //essa função fica responsavel por trazer algunsa dados para serem apresentados nos placeholder
    const [listaSalao, setListaSalao] = useState([]);
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
        if(image === ""){
            alert('selecione uma imagem.');
        } else {        
            const formdata = new FormData();
            formdata.append('image', image);
            const headers = { 
                'headers': {
                    'content-Type': 'multipart/form-data',
                }
            };
            await Api.post('/logo', formdata, headers).then(async(Response) => {
                console.log(Response);
                
                const Data = {
                    cpf_salao, logo_salao: Response.data.filename
                };
                console.log(Data, "dados retornados ao salvar a img ");
                await Api.post('/logosalao', Data).then((Res) => {
                    console.log(Res.data);
                    if(Res.data.list > 0){
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
    };
    //intervalo_entre_agendamentos.
    const [intervalo_entre_agendamentosS, setIntervalo] = useState('');
    const Intervalo = async (e) => {
        e.preventDefault();
        var intervalo_entre_agendamentos = intervalo_entre_agendamentosS;
        if(intervalo_entre_agendamentosS === ''){
            alert('Defina o intervalo .');
        } else if(intervalo_entre_agendamentos.includes(".")){
            alert("Valor não permitido!");
        } else if(intervalo_entre_agendamentos.includes(",")){
            alert('Valore não permitido');
        } else if(intervalo_entre_agendamentos < 1){
            alert('Defina um intervalo Valido!')
        } else {
            const Data = {
                cpf_salao, intervalo_entre_agendamentos
            };
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
    //funcionalidades
    let [funcionalidade, setFuncionalidade] = useState('');
    function Relatorio(){
        if(funcionalidade === ''){
            alert('Selecione uma opção');
        } else if(funcionalidade === 'funcionalidades'){
            alert('Selecione uma opção valida');
        } else if(funcionalidade === 'bruto'){
            //buscar o valor bruto
            Api.post('/rentrada', {cpf_salao}).then((Response) => {
                console.log(Response);
                if(Response.data.resp === 'Nada encontrado'){
                    document.querySelector('#quant').innerText = `Seu Salão ainda Não possuí serviços Finalizados`;
                }else {
                    document.querySelector('#quant').innerText = `Quantidade Bruta de Serviços Realizados : ${Response.data.quantidade}`;
                    document.querySelector('#tot').innerText = `O valor Bruto de entrada do seu caixa foi de  : ${Response.data.valorTotal}`;     
                };
            }).catch((erro) => {
                alert("Erro ao cominicar-se com o servidor.")
            })
        } else if(funcionalidade === 'mensal'){
            var op = document.querySelector('#relat').value;
            if(op > 12){
                alert('Defina um valor valido');
            } else if (op === ''){
                alert('Defina um valor')
            } else {
                // fazer a busca.
                var Data = {mes: op, cpf_salao};
                Api.post('/remes', Data).then((Response) => {
                    document.querySelector('#quant').innerText = `Quantidade  de Serviços Realizados neste mes foi : ${Response.data.quantidade}`;
                    document.querySelector('#tot').innerText = `O valor de entrada do seu caixa foi de  : ${Response.data.valorTotal}`; 
                }).catch((erro) => {
                    alert("Erro ao comunicar-se com o servidor");
                })
            };
        } else if(funcionalidade === 'anual'){
            var op = document.querySelector('#relat').value;
            if(op < 2023){
                alert('Defina um valor valido');
            } else if (op === ''){
                alert('Defina um valor valido')
            } else {
                // fazer a busca.
                var Data = {ano: op, cpf_salao};
                Api.post('/reano', Data).then((Response) => {
                    document.querySelector('#quant').innerText = `Quantidade  de Serviços Realizados neste ano foi : ${Response.data.quantidade}`;
                    document.querySelector('#tot').innerText = `O valor de entrada do seu caixa foi de  : ${Response.data.valorTotal}`; 
                }).catch((erro) => {
                    alert("Erro ao comunicar-se com o servidor");
                })
            };
        };
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
                <div className="DivMenu">
                    <button  onClick={Exit} id='Agenda' className="Btnexit" href="/painel"><FiLogOut/></button>                    
                </div>
            </div>
            {listaSalao.map((iten, key) => {
                return(
                    <section key={iten.id} id="SectionAjustes">
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
                            <p className="PPreferecias">
                                Tempo de duração de cada Serviço.
                            </p>
                            <br/>
                            <p className="PPreferecias">
                                Definir Tempo. 
                            </p>
                            <input
                            id="Minutos"
                            type="number"
                            placeholder={iten.intervalo_entre_agendamentos + ' horas'}
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
                                <br/>
                                <p id="TextoPlano">Para alteraçoẽs no plano entre en contato com nosso supote 24 Horas</p>
                                <p>Ver os Planos : </p>
                                <br/>
                                <a href="/planos">Clik aqui</a>
                                <br/>
                                <br/>
                            </div>
                            <hr/>
                            <div id="gestao">
                                <h2>Relatório de Entrada</h2>
                                <br/>
                                <label>
                                <label>
                                    Referência :  
                                    <input id="relat" type="text" placeholder=" mes  ou  ano"/>
                                </label>
                                <select onChange={(e) => setFuncionalidade(e.target.value)} name="dia" id="dia">
                                    <option value="funcionalidades">Selecionar</option>
                                    <option value="bruto">Relatório Bruto</option>
                                    <option value="mensal">Relatório Mensal</option>
                                    <option value="anual">Relatório Anual</option>
                                </select>
                                </label>
                                <br/>
                                <button onClick={Relatorio} >Gerar Relatório</button>
                                <hr/>
                                <p id="quant"></p>
                                <br/>
                                <p id="tot"></p>
                                <br/>
                                <br/>
                            </div>
                        </div>
                        
                    </section>
                );
            })}
            
        </div>
    );
};