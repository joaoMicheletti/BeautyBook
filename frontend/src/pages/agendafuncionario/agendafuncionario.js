import React, {useEffect, useState} from  'react';
import {useNavigate} from 'react-router-dom' 
import Api from '../../services/api';
import './style_funcionario.css';

export default function AgendaFuncionario(){
    const History = useNavigate();
    //responsável por armazenaar a lista de horários
    const [ListaHorarios, setListaHorarios] =  useState([]);
    //responsavel po armazenar a lista de serviços;
    const [Listarservicos, setListarServicos] = useState([]);
    //input de data e hora.
    const [Datastring, setDatastring] = useState('');
    const [horaAtual, setHora] = useState('');
    //dados cliente 
    const [nome_cliente, setNameCliente] = useState('');
    const [contato_cliente, setContatoCliente] = useState('');
    // input observação 
    const [obs,  setObs] = useState('');
    //serviço e preço de sesrviço
    const [servico, setServico] = useState('');
    const [Preco, setPreco] = useState('');
    var DataAtual = new Date();
    var dia = DataAtual.getDate();
    var mes = DataAtual.getMonth() + 1;
    var ano = DataAtual.getFullYear(); 
    localStorage.removeItem('cpf_salao');
    var cpf_funcionario = localStorage.getItem('cpf_funcionario');
    var cpf_salao = localStorage.getItem('idsalao');;

    if(localStorage.getItem('cpf_funcionario') === null){
        alert('Erro ao buscar os dados do joao');
        History('/');
    };
    //buscando  horarios preenchidos
    useEffect(() =>{
        const Data = {
            cpf_funcionario,
            dia,
            mes,
            ano
        };
        //agenda
        Api.post('/horariospreenchidos', Data).then((Response) =>{
            setListaHorarios(Response.data);
            if(Response.data.length === 0){
                document.querySelector("#AlertaHorarios").innerHTML = "Nada Agendado!.";
            };
        }).catch(() => {
            alert('Erro ao buscar Horários Preenchidos.');
        });
        //agenda
        /*Api.post('/horariospreenchidos', Data).then((Response) =>{
            setListaHorarios(Response.data);
            if(Response.data.length === 0){
                document.querySelector("AlertaHorarios").innerHTML = "Nada Agendado!.";
            };
        }).catch(() => {
            alert('Erro ao buscar Horários Preenchidos.');
         });*/
         const Dat = {
            cpf_salao
         };
         //serviços
         Api.post('/servico', Dat).then((Response) =>{
            setListarServicos(Response.data);
         }).catch((erro) =>{
            alert('Erro ao buscar informações de serviços');
         });
    });

    const Agendar = async (e) =>{
        e.preventDefault();
        var status_servico = "agendado";
        //pegando o nome do dia da semana;
        let partes = Datastring.split("-");
        // Crie um objeto Date (meses em JavaScript vão de 0 a 11, por isso subtraímos 1 do valor do mês)
        let dataObj = new Date(partes[0], partes[1] - 1, partes[2]);
        console.log(dataObj);
        // Crie um array com os nomes dos dias da semana
        let nomesDiasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        // Obtenha o número do dia da semana (0 para Domingo, 1 para Segunda, ..., 6 para Sábado)
        let numeroDiaSemana = dataObj.getDay();
        // Acesse o nome do dia da semana usando o número obtido
        let dia_semana = nomesDiasSemana[numeroDiaSemana];

        //invertendo a ordem da data para dia, mes, ano.
        var dia = parseInt(partes[2], 10);
        var mes = parseInt(partes[1], 10);
        var ano = parseInt(partes[0], 10);
        // essa variável do tipo Date() será usada para garantir que não seja enviado datas passadas ao back;
        // ou seja se essa variável for menor que a DataAtual a data já passou.
        var DATA = new Date(partes[0], partes[1], partes[2]);
        //convertendo a hora para um valor float do jeito que o backend espera.
        var hora_ =  horaAtual.replace(':', '.');
        var hora = parseFloat(hora_);
        //passando o preço para float
        var preco = parseFloat(Preco);
        var Mes = DataAtual.getMonth() + 1;
        var data_atual = DataAtual.getDate()+'/'+Mes+'/'+DataAtual.getFullYear();

        const Data = {
            cpf_salao,
            cpf_funcionario, //ok
            dia_semana, //ok
            dia, //ok
            mes, //ok
            ano, //ok
            nome_cliente, //ok
            contato_cliente, //ok
            status_servico, //ok
            hora, //ok
            obs, //ok
            servico, //ok
            preco, //okv
            data_atual, // para a rota de agendamentos futuros;
            //percent50, //falta
        };
        console.log(Data);
        if(Datastring === ''){
            alert('Selecione uma Data.');
        }else if(hora === ''){
            alert('selecione um Horário.');
        }else if(isNaN(hora)){
            console.log(hora)
            alert('selecione um Horários');
        }else if(DATA < DataAtual){
            alert('DATA INVALIDA: selecione uma data de hoje em diante!');
        }else if(DATA > DataAtual){
            //agendamentos futuros;
            await Api.post('/agendamentosfuturos', Data).then(async (Response) =>{
                if(Response.data === "Dentro do limite para Agendamentos futuros"){
                    await Api.post('/horarioslivres', Data).then(async (Response) =>{
                        if(Response.data === 'agendamento permitido'){

                            await Api.post('/registraragendamento', Data).then((Response) => {
                                alert(Response.data);
                                alert('Agendamento finalizado. Embreve o Salão entrará em contato.');
                            }).catch((erro) =>{
                                alert('Erro ao finalizar o agendamento');
                            });

                        }else{
                            alert('Erro ao criar um agendamento futuro.');
                        };

                    }).catch((erro) =>{
                        alert('Erro ao criar um agendamento futuro.');
                    });
                } else {
                    alert(Response.data);
                };
            }).catch((Erro) =>{
                alert('Erro ao criar um agendamento futuro.');
            });
        }else if(nome_cliente === ''){
            alert('Preencha o Campo @ Nome Completo');
        } else if(contato_cliente.length < 11 || contato_cliente.length > 11){
            alert('Número de telefone invalido');
        } else {
            console.log(Data);
            //verificando se a data e horário estão disponíveis na agenda.
            await Api.post('/horarioslivres', Data).then(async (Response) => {
                console.log(Response);
                if(Response.data === 'Fora do Horário de funcionamento.'){
                    alert("Salão : " + Response.data);
                } else if(Response.data === 'conflito entre agendamentos'){
                    alert(Response.data);
                } else if(Response.data === 'Horário já ocupado'){
                    alert('Desculpe mas: ' + Response.data);
                } else if(Response.data === 'agendamento permitido'){
                    //rota para finalizar o agendamento;
                    await Api.post('/registraragendamento', Data).then((Response) => {
                        alert('Agendamento finalizado. Embreve o Salão entrará em contato.');
                    }).catch((erro) =>{
                        alert('Erro ao finalizar o agendamento');
                    });
                };
            }).catch((err) =>{
                alert('Erro horarios livres')
            });  
        };
    };
    //url das imagens no servidor;
    const Url = "http://127.0.0.1:1998/image/"
    return(
        <div id='ConteinerAgendamento'>
            <header id='HeaderAgendamento'>
                <img src={Url + localStorage.getItem('logo_salao')} alt='Logo Salão' />
                <h1 id='H1NomeSalao'>{localStorage.getItem('nome_salao')}</h1>
            </header>

            <div id='DivAgendamento'>
            <h2>Selecione uma data</h2>
                <div id='DivCalendario'>
                    <input 
                    id='Calendario' 
                    type='date'
                    onChange={(e) => setDatastring(e.target.value)}></input>
                    <br/>
                    <p>Selecione a Hora.</p>
                    <input 
                    type="time" id="hora" name="hora"
                    onChange={(e) => setHora(e.target.value)}></input>
                </div>
                <br/>
                <br/>
                <div id='Horarios'>
                    <p id='PHorariosDisponiveis'>
                        Horários preenchidos de Hoje.
                    </p>
                    <br/>
                    <p id='AlertaHorarios'></p>
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
                        const SelectServico = () =>{
                            setPreco(iten.preco);
                            setServico(iten.servico);
                            alert('Serviço selecionado!.')
                        };
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p className='TipoServiço'>
                                        {iten.servico} : {iten.preco}R$
                                    </p>
                                    <input type='button' onClick={SelectServico} value='Selecionar'/>
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
                        <p className='PFormCliente'>Nos envie uma Observação.</p>
                        <input
                        type='text'
                        className='InputFormCliente'
                        placeholder='observação para o salão'
                        onChange={(e) => setObs(e.target.value)}/>
                        <button id='BtnFormCliente' type='submit'>Concluir Agendamento</button>
                    </form>
                </div>
            </div>

        </div>
    );
};