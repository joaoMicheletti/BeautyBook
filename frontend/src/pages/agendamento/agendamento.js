import React, {useEffect, useState} from  'react';
import Api from '../../services/api';
import './style_agendamento.css';

export default function Agendamento(){

    //responsável por armazenar a lista de horários
    const [ListaHorarios, setListaHorarios] =  useState([]);

    //responsável po armazenar a lista de serviços.
    const [ListaServicos, setListaServicos] = useState([]);

    //input de data e hora.
    const [Datastring, setDatastring] = useState('');
    const [horaAtual, setHora] = useState('');

    //dados cliente 
    const [nome_cliente, setNameCliente] = useState('');

    //contato cliente
    const [contato_cliente, setContatoCliente] = useState('');

    // input observação 
    const [obs,  setObs] = useState('');

    //serviço e preço de sesrviço
    const [servico, setServico] = useState('');
    const [Preco, setPreco] = useState('');

    //data atual e separando seu dia mes e ano para alterar a orden
    var DataAtual = new Date();
    var dia = DataAtual.getDate();
    var mes = DataAtual.getMonth() + 1;
    var ano = DataAtual.getFullYear();

    //pegando atraves do estorage o cpf do salão ao quao o cliente gostatria de fazer o agendamento.
    var cpf_salao = localStorage.getItem('cpf_salao');

    //buscando à agenda e os serviços do salão;
    useEffect( ()=>{
        const Data = {
            cpf_salao,
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
            //alert('Erro ao buscar Horários Preenchidos.');
        });
        const Dat = {
            cpf_salao
        };
        //serviços
        Api.post('/servico', Dat).then((Response) => {
            setListaServicos(Response.data);        
        }).catch(()=>{
            //alert('Erro ao buscar informações de servoços.');
        });
    });
    
    const Agendar = async (e) =>{
        e.preventDefault();
        var status_servico = "agendado";
        //pegando o nome do dia da semana, atraves do input date
        let partes = Datastring.split("-");
        console.log(partes);
        //separando o  dia, mes, ano.
        var dia = parseInt(partes[2], 10);
        var mes = parseInt(partes[1], 10);
        var ano = parseInt(partes[0], 10);
        // Crie um objeto Date (meses em JavaScript vão de 0 a 11, por isso subtraímos 1 do valor do mês)
        let dataObj = new Date(partes[0], partes[1] -1 , partes[2]);
        // Crie um array com os nomes dos dias da semana
        let nomesDiasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        // Obtenha o número do dia da semana (0 para Domingo, 1 para Segunda, ..., 6 para Sábado)
        let numeroDiaSemana = dataObj.getDay();
        // Acesse o nome do dia da semana usando o número obtido
        let dia_semana = nomesDiasSemana[numeroDiaSemana];
        //convertendo a hora para um valor float do jeito que o backend espera.
        var hora_ =  horaAtual.replace(':', '.');
        var hora = parseFloat(hora_);
       //passando o preço para float
        var preco = parseFloat(Preco);
        
        //a data atual de ser enviada no formato de String
        //está varievél 'Mes' referese ao mes da variavél 'DataAtual'
        //diferente da variavél 'mes' que faz referencia a variavél 'partes'
        var Mes = DataAtual.getMonth() + 1;
        var data_atual = DataAtual.getDate()+'/'+Mes+'/'+DataAtual.getFullYear();
        
        const Data = {
            cpf_salao, //ok
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
        
        if(Datastring === ''){
            alert('Selecione uma Data.');
        }else if(hora === ''){
            alert('selecione um Horário.');
        }else if(isNaN(hora)){
            alert('selecione um Horário.');
        }else if(servico === ''){
            alert('Selecione un serviço!');
        }else if(nome_cliente === ''){
            alert('Preencha o Campo @ Nome Completo');
        }else if(contato_cliente.length < 11 || contato_cliente.length > 11){
            alert('Número de telefone invalido');
            // agendamentos atual.
        } else if(dia === DataAtual.getDate() && mes === DataAtual.getMonth()+1 && ano === DataAtual.getFullYear()){
            //verificando se a data e horário estão disponíveis na agenda.
            await Api.post('/horarioslivres', Data).then(async (Response) => {
                console.log("espaço livre>>> ", Response.data);
                // fora do horário de funcionamento.
                if(Response.data === 'Fora do Horário de funcionamento.'){
                    console.log("Fora de funcionamento", Response.data);
                    alert("Salão : " + Response.data);
                    // é possivel que um horário não estará finalizado antes de começar o seu
                } else if(Response.data === 'conflito entre agendamentos'){
                    console.log('conflito entre agendamentos', Response.data);
                    alert(Response.data);
                    //horários já preenchido
                } else if(Response.data === 'Horário já ocupado'){
                    alert('Desculpe mas: ' + Response.data);
                } else if(Response.data === 'agendamento permitido'){
                    console.log('indo agendar');
                    //rota para finalizar o agendamento;
                    await Api.post('/registraragendamento', Data).then((Response) => {
                        alert('Agendamento finalizado. Embreve o Salão entrará em contato.');
                    }).catch((erro) =>{
                        //possivel falha de comunicação com o servidor
                        alert('Erro ao finalizar o agendamento');
                    });
                };
            }).catch((err) =>{
                // falha de comunicação com o servidor
                alert('Servidor não responde!')
            });
            ///////////////////////////////////////////////////////////////////////////////////////////////////////
            // validações para agendamento futuro.
        } else if(dia >=  DataAtual.getDate()){
            if(mes >= DataAtual.getMonth() + 1 && ano >= DataAtual.getFullYear()){
                //agendamentos futuros;
                console.log('top agendameto futuro');
            await Api.post('/agendamentosfuturos', Data).then(async (Response) =>{
                
                //verificar data limite para agendamentos futuros;
                if(Response.data === "Dentro do limite para Agendamentos futuros"){
                    
                    await Api.post('/horarioslivres', Data).then(async (Response) =>{
                        console.log(Response.data)
                        //confirmar se pode ou nçao realizar o agendamento
                        if(Response.data === 'agendamento permitido'){
                            //em fim agendar com o salão.
                            await Api.post('/registraragendamento', Data).then((Response) => {
                                alert('Agendamento finalizado. Embreve o Salão entrará em contato.');
                            }).catch((erro) =>{
                                // falha de comunicação com o serviodor
                                alert('Erro ao finalizar o agendamento');
                            });
                        }else if(Response.data === 'Horário já ocupado'){
                            // pode ter gerado uim conflito entre agendamentos.
                            alert(Response.data);
                        } else if(Response.data === 'conflito entre agendamentos'){
                            alert(Response.data);
                        };
                    }).catch((erro) =>{
                        // erro de comunicação com o servidor.
                        alert('Erro ao criar um agendamento futuros.');
                    });
                } else {
                    // fora do prazo para agendamentos.
                    alert(Response.data);
                };
            }).catch((Erro) =>{
                alert('Erro ao criar um agendamento futuro.');
            });
            }else{
                alert("Data invalida");
            }
        } else {
            alert("Data Invalida");
        }
        /*
        else if(DATA > DataAtual){
            
        }else if(nome_cliente === ''){
            alert('Preencha o Campo @ Nome Completo');
        } else if(contato_cliente.length < 11 || contato_cliente.length > 11){
            alert('Número de telefone invalido');
        } else {        
        }; */
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
                <h2 className='h2'>Data</h2>
                <div id='DivCalendario'>
                    <input 
                    className='Calendario' 
                    type='date'
                    onChange={(e) => setDatastring(e.target.value)}></input>
                    <br/>
                    <p id='Phora'>Selecione a Hora.</p>
                    <input 
                    type="time" id="hora" name="hora"
                    onChange={(e) => setHora(e.target.value)}></input>
                </div>
                <br/>
                <br/>
                <p id='PHorariosDisponiveis'>
                        Horários preenchidos de Hoje.
                    </p>
                    <p id='AlertaHorarios'></p>
                <div id='Horarios'>
                {ListaHorarios.map((iten, key) =>{
                        //formatando a ohra de inicio do agenda mento;
                        var init = String(iten.hora);
                        var partesInicio = init.split('.');
                        var inicioFormatado = partesInicio[0]+':'+partesInicio[1];
                        if(partesInicio[1] === undefined){
                            inicioFormatado = partesInicio[0]+':'+'00';
                        }
                       
                        //formatando a hora de termino do agendamento.
                        var termino = String(iten.hora_termino);
                        var partesFim = termino.split('.');
                        var fimFormatado = partesFim[0]+':'+partesFim[1];
                        if(partesFim[1] === undefined){
                            fimFormatado = partesFim[0]+':'+'00';
                        }
                        console.log(ListaHorarios)
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p> Inicio - {inicioFormatado} <br/> termino {fimFormatado} </p>
                                </li>
                            </ul>
                        );
                    })}           
                </div>
                <br/>
                <hr/>
                <br/>
                <h2 className='h2'>Serviços</h2>
                <div id='Serviços'>
                    
                    {ListaServicos.map((iten, key) =>{
                        console.log("aqui <><><><>", ListaServicos)
                        const SelectServico = () =>{
                            setPreco(iten.preco);
                            setServico(iten.servico);
                            alert('Serviço selecionado!.')
                        };
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p className='TipoServiço'>
                                        {iten.servico}<br/><br/>R$ {iten.preco.toFixed(2)}
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
                    <h2 className='h2'>Formulário de agendamento</h2>
                    <br/>
                    <form onSubmit={Agendar}>
                        <p className='PFormCliente'>Nome Completo</p>
                        <input
                        type='text'
                        className='InputFormCliente'
                        placeholder='Nome Completo'
                        onChange={(e) => setNameCliente(e.target.value)}/>
                        <p className='PFormCliente'>Número do WhatsApp</p>
                        <input
                        type='number'
                        className='InputFormCliente'
                        placeholder='Telefone WhatsApp'
                        onChange={(e) => setContatoCliente(e.target.value)}/>
                        <br/>
                        <p className='PFormCliente'>Observação.</p>
                        <textarea
                        type='text'
                        className='InputFormCliente'
                        placeholder='___mensagem'
                        onChange={(e) => setObs(e.target.value)}/>
                        <button id='BtnFormCliente' type='submit'>agendar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};