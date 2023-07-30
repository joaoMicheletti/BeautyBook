import React, {useEffect, useState} from  'react';
import Api from '../../services/api';
import './style_agendamento.css';
import Logo from  '../assets/Logo.png';

export default function Agendamento(){
    //responsável por armazenaar a lista de horários
    const [ListaHorarios, setListaHorarios] =  useState([]);
    //responsável po armazenar a lista de servoços.
    const [ListaServicos, setListaServicos] = useState([]);
    //input de data.
    const [Datastring, setDatastring] = useState('');
    //dados cliente 
    const [nome_cliente, setNameCliente] = useState('');
    const [contato_cliente, setContatoCliente] = useState('');
    var DataAtual = new Date();
    var dia = DataAtual.getDate();
    var mes = DataAtual.getMonth() + 1;
    var ano = DataAtual.getFullYear(); 
    var cpf_salao = localStorage.getItem('cpf_salao');

    //buscando à agenda do salão;
    useEffect( ()=>{
        const Data = {
            cpf_salao,
            dia,
            mes,
            ano
        };
        
        Api.post('/horariospreenchidos', Data).then((Response) =>{
            setListaHorarios(Response.data); 
        }).catch(() => {
            alert('Erro ao buscar Horários Preenchidos.');
        });            
    }, []);

    useEffect(() => {
        const Data = {
            cpf_salao
        };
        Api.post('/servico', Data).then((Response) => {
            setListaServicos(Response.data);        
        }).catch(()=>{
            alert('Erro ao buscar informações de servoços.');
        });

    },[]);
    
    //agendamento 
    /**
     * para ver espaço na agenda 
     * cpf_salao, 
            cpf_funcionario,
            dia_semana,
            dia, mes, ano, hora,
            //
            criar agendamento
            cpf_salao,
            cpf_funcionario,
            dia,
            mes,
            ano,
            hora,
            servico,
            preco,
            nome_cliente,
            contato_cliente,
            obs,
            percent50,
            status_servico
            //agendamento futuro//
     */
    const Agendar = (e) =>{
        e.preventDefault();
        console.log(Datastring);
        let partes = Datastring.split("-");
        let dataNovaString = partes[2] + "/" + partes[1] + "/" + partes[0];
        var dia = partes[2];
        var mes = partes[1];
        var ano = partes[0];
        console.log(dia, mes, ano);
        console.log(nome_cliente); // so pra evitar os alertas chatos 
        console.log(contato_cliente.length);
        if(nome_cliente === ''){
            alert('Preencha o Campo @ Nome Completo');
        } else if(contato_cliente.length < 11 || contato_cliente.length > 11){
            alert('Número de telefone invalido');
        };
    };
    return(
        <div id='ConteinerAgendamento'>
            <header id='HeaderAgendamento'>
                <img src={Logo} alt='Logo Salão' />
                <h1 id='H1NomeSalao'>Nome Salão</h1>
            </header>

            <div id='DivAgendamento'>
                <h2>Selecione uma data</h2>
                <div id='DivCalendario'>
                    <input 
                    id='Calendario' 
                    type='date'
                    onChange={(e) => setDatastring(e.target.value)}></input>
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
                    {ListaServicos.map((iten, key) =>{
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
                    <form onSubmit={Agendar}>
                        <p className='PFormCliente'>Nome Completo</p>
                        <input
                        type='text'
                        className='InputFormCliente'
                        placeholder='Nome Completo'
                        onChange={(e) => setNameCliente(e.target.value)}/>

                        <p className='PFormCliente'>Número de telefone WhatsApp</p>
                        <input
                        type='number'
                        className='InputFormCliente'
                        placeholder='Telefone WhatsApp'
                        onChange={(e) => setContatoCliente(e.target.value)}/>
                        <br/>
                        <button id='BtnFormCliente' type='submit'>Concluir Agendamento</button>
                    </form>
                </div>
            </div>

        </div>
    );
};