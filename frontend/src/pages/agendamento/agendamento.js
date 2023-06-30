import React from  'react';
import './style_agendamento.css';
import Logo from  '../assets/Logo.png';
export default function Agendamento(){
    return(
        <div id='ConteinerAgendamento'>
            <header id='HeaderAgendamento'>
                <img src={Logo} alt='Logo Salão' />
                <h1 id='H1NomeSalao'>Nome Salão</h1>
            </header>

            <div id='DivAgendamento'>
                <h2>Selecione uma data</h2>
                <div id='DivCalendario'>
                    <input id='Calendario' type='date'></input>
                </div>
                <div id='Horarios'>
                    <p id='PHorariosDisponiveis'>
                        Selecione a baixo um dos horários disponiveis
                    </p>
                    
                    <ul>
                        <li>
                            <p>Horário Disponivel : xx:xx</p>
                            <input type='button'value='Selecionar'></input>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p>Horário Disponivel : xx:xx</p>
                            <input type='button'value='Selecionar'></input>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p>Horário Disponivel : xx:xx</p>
                            <input type='button'value='Selecionar'></input>
                        </li>
                    </ul>               
                </div>
                <br/>
                <hr/>
                <br/>
                <div id='Serviços'>
                    <h2>Selecione um Serviço</h2>
                    <ul>
                        <li>
                            <p className='TipoServiço'>
                                Progressiva mais Chapinha : xx,xxR$
                            </p>
                            <input type='button' value='Selecionar'/>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className='TipoServiço'>
                                Progressiva mais Chapinha : xx,xxR$
                            </p>
                            <input type='button' value='Selecionar'/>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className='TipoServiço'>
                                Progressiva mais Chapinha : xx,xxR$
                            </p>
                            <input type='button' value='Selecionar'/>
                        </li>
                    </ul>
                </div>
                <br/>
                <hr/>
                <br/>
                <div id='DivFormCliente'>
                    <h2>Dados Do Cliente</h2>
                    <br/>
                    <form>
                        <p className='PFormCliente'>Nome Completo</p>
                        <input
                        type='text'
                        className='InputFormCliente'
                        placeholder='Nome Completo'/>
                        <p className='PFormCliente'>Número de telefone WhatsApp</p>
                        <input
                        type='number'
                        className='InputFormCliente'
                        placeholder='Telefone WhatsApp'/>
                        <br/>
                        <button id='BtnFormCliente' type='submit'>Concluir Agendamento</button>
                    </form>
                </div>
            </div>

        </div>
    );
};