import React, {useEffect, useState} from  'react';
import {useNavigate} from 'react-router-dom' 
import Api from '../../services/api';
import './style_funcionario.css';
import Logo from  '../assets/Logo.png';

export default function AgendaFuncionario(){
    const History = useNavigate();
    //responsável por armazenaar a lista de horários
    const [ListaHorarios, setListaHorarios] =  useState([]);
    //responsavel po armazenar a lista de serviços;
    const [Listarservicos, setListarServicos] = useState([]);
    var DataAtual = new Date();
    var dia = DataAtual.getDate();
    var mes = DataAtual.getMonth() + 1;
    var ano = DataAtual.getFullYear(); 
    localStorage.removeItem('cpf_salao');

    if(localStorage.getItem('cpf_funcionario') === null){
        alert('Erro ao buscar os dados do salão');
        History('/');
    };
    //buscando  horarios preenchidos
    useEffect(() =>{
        var cpf_funcionario = localStorage.getItem('cpf_funcionario');
            const Data = {
                cpf_funcionario,
                dia,
                mes,
                ano
            };
        Api.post('/horariospreenchidos', Data).then((Response) =>{
            setListaHorarios(Response.data);
        }).catch(() => {
            alert('Erro ao buscar Horários Preenchidos.');
         });
    },[]);

    useEffect( () =>{
        var cpf_salao = localStorage.getItem('idsalao');
        const Data = {
            cpf_salao
        };
        Api.post('/servico', Data).then((Response) =>{
            setListarServicos(Response.data);
        }).catch(() =>{
            alert('Erro ao carregar informações se servioços');
        });
    },[]);
    
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
                        Horários preenchidos de Hoje.
                    </p>
                    {ListaHorarios.map((iten, key) =>{

                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p>Horário Preenchido : das {iten.hora} Horas as {iten.hora_termino} Horas</p>
                                </li>
                            </ul>

                        );
                    })}           
                </div>
                <br/>
                <hr/>
                <br/>
                <div id='Serviços'>
                    <h2>Selecione um Serviço</h2>
                    {Listarservicos.map((iten, key) =>{
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p className='TipoServiço'>
                                        {iten.servico} : {iten.preco}R$
                                    </p>
                                    <input type='button' value='Selecionar'/>
                                </li>
                            </ul>
                        );
                    })}
                    
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