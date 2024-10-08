import React, {useEffect, useState}from "react";
import Api from "../../services/api";
import './style.css';

export default function AgendaF(){
    const DataAtual = new Date();// oibjeto data atual;
    //o servidor espera receber semaradamente o diam, mes e ano,
    var dia = parseInt(DataAtual.getDate(), 10);
    var mes = parseInt(DataAtual.getMonth(), 10) + 1;
    var ano = parseInt(DataAtual.getFullYear(), 10); 
    //pegando do storage o cpf do salão;
    var cpf_funcionario = localStorage.getItem('cpf_funcionario');
    const [Agendados, setAgendados] = useState([]);
    const Data = {
        dia, mes, ano, cpf_funcionario
    };    
    
    useEffect( () =>{
        Api.post('/horariospreenchidos', Data).then((Response) =>{
            setAgendados(Response.data);            
        }).catch((erro) =>{
            alert('Erro interno.');
        });
    }, []); //não passar dependências retorna um alerta ! porem ao passar o Data como dependência ele cai num loop infinito de requisições.
    const [buscados, setBuscados] = useState([]);
    function Buscar(){
        console.log('Click here!')
        // escondendo a div agendados
        document.querySelector('#Agendados').style.display = 'none';
        // mostrando a div Buscados 
        document.querySelector('#Buscados').style.display = 'flex';
        var inputData = document.querySelector('#SelectMes').value;
        console.log(inputData);
        if(inputData === ''){
            alert('Preencha o Campo com uma data ')
        } else {
            var partes = inputData.split('-');
            var dia = partes[2];
            var mes = partes[1];
            var ano = partes[0];
            const Data = {
                dia, mes, ano, cpf_funcionario
            };
            console.log(Data);
            Api.post('/buscarfuncionario', Data).then((Response) => {
                console.log(Response)
                if(Response.data.res ===  "nenhum agendamento encontrado "){
                  alert(Response.data.res)
                } else {
                  console.log(Response.data);
                  setBuscados(Response.data);
                  console.log(buscados);
                  
                }; 
            }).catch((Erro) => {
                alert('Erro ao cominicar-se com o servidor');
            });
        };
    };
    return(
        <div id="PainelSalao">
            <header id="HeaderSalao">
                <a id="Link_AF" href="/painel">Voltar</a>
                <h1 id="TitleSalao" >Agenda do funcionário</h1>
            </header>
            <hr/>
            <section id="SectionFuncionarioAgenda">
                <h1 id="TitleAgenda">Agenda</h1>
                <div id="ConteinerAgenda">
                    <div id="DiaMesAno">
                        <input id="SelectMes" type="date"></input>
                        <button id="BtnAgenda" onClick={Buscar} type="sybmit">Buscar</button>
                    </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <div id="Buscados">
                {buscados.map((iten, key) =>{
                        //funções de cancelar e finalizar;
                        //cancelar;
                        const Cancelar = async (e) =>{
                            var id = iten.id;
                            var Data = {
                                id
                            };                            
                            await Api.put('/cancelarservico', Data).then((Response) =>{
                                alert(Response.data);
                                
                            }).catch(() =>{
                                alert('Erro interno.')
                            });
                        };
                        //finalizar;
                        const Finalizar = async (e) =>{
                            var id = iten.id;
                            var Data = {
                                id
                            };                            
                            await Api.put('/finalizarservico', Data).then((Response) =>{
                                console.log(Response);
                                alert(Response.data);
                            }).catch(() =>{
                                alert('Erro interno.')
                            });
                        };
                        //formatando hora de inicio;
                        var init = String(iten.hora);
                        var partesInicio = init.split('.');
                        var inicioFormatado = partesInicio[0]+':'+partesInicio[1];
                        //formatando hora do termino;
                        var fim = String(iten.hora_termino);
                        var partesFim = fim.split('.');
                        console.log(partesFim);
                        var fimFormatado = partesFim[0]+':'+partesFim[1];
                        console.log(partesInicio[1])
                        console.log(partesInicio)
                        //url whatsapp;
                        var whatsapp = "https://api.whatsapp.com/send?phone="+iten.contato_cliente+"&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?"
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <div id="Header_agendamento">
                                        <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                                    </div>                                    
                                    <br/>
                                    <p>Início: {partesInicio[0]+':'+partesInicio[1]}<br/>  
                                    Término: {partesFim[0]+':'+partesFim[1]}</p>
                                    <p>Cliente :  {iten.nome_cliente}</p>
                                    <p>WhatsApp Cliente : </p> 
                                    <a target="_blank"
                                    rel='noreferrer'  
                                    href={whatsapp}
                                    className="LKWhatsapp">{iten.contato_cliente}</a>
                                    <br/>
                                    <br/>
                                    <p> Funcionário : {iten.nome_completo}</p>
                                    <p>Serviços :  {iten.servico}</p>
                                    <p>Observação : {iten.obs}
                                    </p>
                                    <br/>
                                    <p className="UnderLine">Valro Serviço : R$ {iten.preco.toFixed(2)}</p><br/>
                                    
                                </li>
                                <div className="DivStatusB">
                                        <button className="BtnStatus" onClick={Cancelar}>Cancelar</button>
                                        <button className="BtnStatus" onClick={Finalizar}>finalizado</button>
                                </div>
                            </ul>
                            
                        );
                    })}
                </div>
                <div id="Agendados">
                    {Agendados.map((iten, key) =>{
                        //funções de cancelar e finalizar;
                        //cancelar;
                        const Cancelar = async (e) =>{
                            var id = iten.id;
                            var Data = {
                                id
                            };                            
                            await Api.put('/cancelarservico', Data).then((Response) =>{
                                alert(Response.data);
                                
                            }).catch(() =>{
                                alert('Erro interno.')
                            });
                        };
                        //finalizar;
                        const Finalizar = async (e) =>{
                            var id = iten.id;
                            var Data = {
                                id
                            };                            
                            await Api.put('/finalizarservico', Data).then((Response) =>{
                                console.log(Response);
                                alert(Response.data);
                            }).catch(() =>{
                                alert('Erro interno.')
                            });
                        };
                        //formatando hora de inicio;
                        var init = String(iten.hora);
                        var partesInicio = init.split('.');
                        var inicioFormatado = partesInicio[0]+':'+partesInicio[1];
                        //formatando hora do termino;
                        var fim = String(iten.hora_termino);
                        var partesFim = fim.split('.');
                        var fimFormatado = partesFim[0]+':'+partesFim[1];
                        //url whatsapp;
                        var whatsapp = "https://api.whatsapp.com/send?phone="+iten.contato_cliente+"&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?"
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <div id="Header_agendamento">
                                        <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                                    </div>
                                    <br/>
                                    <p>Início: {partesInicio[0]+':'+partesInicio[1]}<br/>  
                                    Término: {partesFim[0]+':'+partesFim[1]}</p>
                                    <p>Cliente :  {iten.nome_cliente}</p>
                                    <p>WhatsApp Cliente : </p> 
                                    <a target="_blank"
                                    rel='noreferrer'  
                                    href={whatsapp}
                                    className="LKWhatsapp">{iten.contato_cliente}</a>
                                    <br/>
                                    <br/>
                                    <p> Funcionário : {iten.nome_completo}</p>
                                    <p>Serviços :  {iten.servico}</p>
                                    <p>Observação : {iten.obs}
                                    </p>
                                    <br/>
                                    <p className="UnderLine">Valro Serviço : R$ {iten.preco.toFixed(2)}</p><br/>
                                    <div className="DivStatusA">
                                        <button className="BtnStatus" onClick={Cancelar}>Cancelar</button>
                                        <button className="BtnStatus" onClick={Finalizar}>finalizado</button>
                                    </div>
                                </li>
                            </ul>
                            
                        );
                    })}
                </div>
            </section>
        </div>
    );
};