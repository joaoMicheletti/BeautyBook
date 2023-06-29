import React from "react";
import Logo from '../assets/Logo.png'
import './style_ajustes.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function Ajustes(){
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
            <section id="SectionAgendaSalao">
                <h1 id="TitleAjustes">Preferências</h1>
                <div id="AjustesImg" >
                    <p id="ParagrafoImg" >Adicionar / Editar Logo do salão</p>
                    <input  
                    type="file"  
                    className="BtnImg"
                    accept=".doc,.docx,.xml,application" 
                    />
                    <button
                    type="submit"
                    className="BtnImg"
                    >Adicionar | Editar</button>
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
                    placeholder="Defina com minutos"></input>
                    <br/>
                    <br/>
                    <button
                    id="BtnMinutos"
                    type="submit"
                    >Definir</button>
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
                            placeholder="Defina com minutos"></input>
                            <p className="PPreferecias">Após o horário atual.</p>
                            <button
                            type="submit"
                            id="DefinirCimaHora">Definir</button>

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
                            placeholder="Defina com dias"></input>
                            <p className="PPreferecias">Após a Data atual.</p>
                            <button
                            type="submit"
                            id="DefinirCimaHora">Definir</button>

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
                            placeholder="Nova Senha"></input>
                            <p className="PFormSenha">
                               Confirnmar Nova Senha
                            </p>
                            <input
                            className='InputFormSenha'
                            type="password"
                            placeholder="Confirmar Nova Senha"></input>
                            <br/>
                            <button 
                            id="BtnFormSenha"
                            type="submit">Editar</button>
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
                            placeholder="Nome Do Estabelecimento"></input>
                            <p className="PCadastro">
                                Endereço estabelecimento
                            </p>
                            <input 
                            className="InputCadastro"
                            type="text"
                            placeholder="Endereço Do Estabelecimento"></input>
                            <p className="PCadastro">
                                Email
                            </p>
                            <input 
                            className="InputCadastro"
                            type="email"
                            placeholder="E-mail"></input>
                            <br/>
                            <button
                            id="BtnCadastro"
                            type="submit"
                            >Editar</button>
                        </form>
                    </div>
                    <hr/>
                    <div id="Plano">
                        <h2 id="TitlePlanos">Planos</h2>
                        <p id="TextoPlano">
                        Area em construção:
                        <br/>
                        OBS: Os planos só poderão sofrer alterações após 3 meses de assinatura . 
                        </p>
                    </div>
                </div>
                
            </section>
        </div>
    );
};