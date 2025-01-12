import React, {useEffect, useState}from "react";
import Api from "../../services/api";
import {useNavigate} from 'react-router-dom'
import './style.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';
import{FiLogOut} from 'react-icons/fi';
import Relogio from '../assets/relogio.png';
import Perfil from '../assets/perfil.png';
import Whats from '../assets/whats.png';
import Servico from '../assets/servico.png';
import Cash  from '../assets/cash.png';
import Status from '../assets/status.png';

export default function Painel(){
    const History = useNavigate();
    const DataAtual = new Date();// oibjeto data atual;
    //o servidor espera receber semaradamente o diam, mes e ano,
    var dia = parseInt(DataAtual.getDate(), 10);
    var mes = parseInt(DataAtual.getMonth(), 10) + 1;
    var ano = parseInt(DataAtual.getFullYear(), 10); 
    //pegando do storage o cpf do salão;
    var cpf_salao = localStorage.getItem('cpf_salao');
    const [Agendados, setAgendados] = useState([]);
    const [Buscados, setBuscados] =  useState([]);
    const Data = {
        dia, mes, ano, cpf_salao
    };
    Api.post('/assinatura', {cpf_salao}).then((Response) => {
        console.log("ai ai ai ai ", Response)
        if(Response.data.res === 'Seus dias de acesso livre a plataforma acabaram, contrate um plano.'){
            alert('Seus dias de acesso livre a plataforma acabaram, contrate um plano.');
            History('/planos')
        } else if(Response.data.res === true){
            console.log(Response.data.res);
        } else if(Response.data.res === 'null'){
            alert('Seu plano encontra-se "Expirado", regularize para ter acesso a plataforma.')
            History('/planos')
        } else {
        }
    }).catch((Erro) => {
        alert('Erro ao validar sua assinatura!');
    });
    // função para buscar agenda de uma determindada data;
    function Buscar(){
        console.log('Click here!')
        // escondendo a div agendados
        document.querySelector('#Agendados').style.display = 'none';
        // mostrando a div Buscados 
        document.querySelector('#Buscados').style.display = 'flex';
        var inputData = document.querySelector('#SelectMes').value;
        if(inputData === ''){
            alert('Preencha o Campo com uma data ')
        }
        var partes = inputData.split('-');
        var dia = partes[2];
        var mes = partes[1];
        var ano = partes[0];
        const Data = {
            dia, mes, ano, cpf_salao
        };
        console.log(Data);
        Api.post('/buscasalao', Data).then((Response) => {
            console.log(Response)
            if(Response.data.res === 'nenhum agendamento encontrado.'){
                alert(Response.data.res)
            } else {
                setBuscados(Response.data);
            };
            
        }).catch((Erro) => {
            alert('Erro ao cominicar-se com o servidor');
        });
    };    
    useEffect( () =>{
        Api.post('/horariospreenchidos', Data).then((Response) =>{
            setAgendados(Response.data);
            
        }).catch((erro) =>{
            alert('Erro interno.');
        });
    }, []); //não passar dependências retorna um alerta ! porem ao passar o Data como dependência ele cai num loop infinito de requisições.
    const [infoSalao, setinfoSalao] = useState([]);
    useEffect(() => {
        Api.post('/buscarsalao', {cpf_salao}).then((Response) => {
            setinfoSalao(Response.data);
            console.log(Response, '<><><>',infoSalao);
            console.log(Response.data);
        }).catch((Erro) =>{
            alert('erro ao buscar oformações do salão');
        });
    }, []);
    const Url = "http://127.0.01:1998/image/";
    const Exit = (e) => {
        e.preventDefault();
        localStorage.removeItem(cpf_salao);
        alert('Até breve');
        History('/loginsalao');
    };
    //relatório diario;
    function RelatorioDiarioFinalizado(){
        console.log('click on function relatorios diarios');
        
        Api.post('/relatoriodiario', {cpf_salao} ).then((Response) => {
            console.log(Response.data);
            document.querySelector('#quantF').innerHTML = Response.data.finalizado;
            document.querySelector('#valorF').innerHTML = Response.data.total;
        }).catch((erro) => {
            alert('Erro ao criar o relatório diario');
        })
    };
    //relatório diario;
    function RelatorioDiarioCancelados(){
        
        Api.post('/relatoriodiariocancelado', {cpf_salao} ).then((Response) => {
            console.log(Response.data);
            document.querySelector('#quantC').innerHTML = Response.data.finalizado;
            document.querySelector('#valorC').innerHTML = Response.data.total;
        }).catch((erro) => {
            alert('Erro ao criar o relatório diario');
        })
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
                <div  id='DivAganda' className="DivMenu" style={{backgroundColor: "white"}}>
                    <a id='Agendaa' className="BtnMenu" href="/painel"><FcCalendar/></a>
                </div>
                <div className="DivMenu">
                    <a id="Services" className="BtnMenu" href="/servicos"><FcServices/></a>                    
                </div>
                
                <div className="DivMenu">
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
                <div className="DivMenu">
                    <button  onClick={Exit} id='Agenda' className="Btnexit" href="/painel"><FiLogOut/></button>                    
                </div>
            </div>
            <section id="SectionAgendaSalaoPainel">
                <br/>
                <div id="ConteinerAgendaPainel">
                    <div id="DiaMesAno">
                        <input id="SelectMes" type="date"></input>
                        <button id="BtnAgenda" onClick={Buscar}>Buscar</button>
                    </div>
                </div>
                <br/>
                <hr/>
                <br/>
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
                                window.location.reload(true);
                                
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
                            console.log(Data)             
                            await Api.put('/finalizarservico', Data).then((Response) =>{
                                window.location.reload(true);
                            }).catch(() =>{
                                alert('Erro interno.')
                            });
                        };
                        //formatando  a hora de inicio do serviço;
                        var init = String(iten.hora);
                        var partesInicio = init.split('.');
                        var inicioFormatado = 0;//partesInicio[0]+':'+partesInicio[1];
                        if(partesInicio[1] === undefined){
                            inicioFormatado = partesInicio[0]+":"+'00';
                        } else {
                            inicioFormatado = partesInicio[0]+':'+partesInicio[1];
                        }
                        console.log(partesInicio)
                        console.log(inicioFormatado, '<><><><><><<<<<<<>>>>>>><<<<<>>>><><><><><><><><><><><><');
                        // formatando a hora de término do serviço
                        var fim = String(iten.hora_termino);
                        var partesFim = fim.split('.');
                        var fimFormatado = 0;

                        if (partesFim[1] === undefined) {
                            fimFormatado = partesFim[0] + ":" + '00';
                        } else {
                            // Formata a parte dos minutos para garantir que tenha exatamente dois dígitos
                            var minutos = partesFim[1].slice(0, 2);
                            if (minutos.length === 1) {
                                minutos += '0';
                            }
                            fimFormatado = partesFim[0] + ':' + minutos;
                        }

                        console.log(fimFormatado);;
                        //url whatsapp;
                        //'https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?'
                        var whatsapp = "https://api.whatsapp.com/send?phone=55"+iten.contato_cliente+"&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?"
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <div id="DivHeaderAgenda"><br/>
                                        <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                                    </div>
                                    <br/>
                                    <div className="Relogio">
                                        <img className="imgRelogio" src={Relogio} />
                                        <p>{inicioFormatado} <br/> {fimFormatado}</p>
                                    </div>
                                    <div className="perfilCliente">
                                        <img className="imgRelogio" src={Perfil} />
                                        <p><br/>  {iten.nome_cliente}</p>
                                    </div>
                                    <div className="perfilCliente">
                                        <img className="imgRelogio" src={Whats} />
                                        <br/>
                                        <a target="_blank"
                                            rel='noreferrer'  
                                            href={whatsapp} 
                                            className="LKWhatsapp">{iten.contato_cliente} .
                                            </a>
                                    </div>
                                    <div className="perfilCliente">
                                        <img className="imgRelogio" src={Servico} />
                                        <p className="LKWhatsapp" > {iten.servico}</p>
                                    </div>
                                    <div id="OBS">
                                        <div id="TitleOBS">
                                            <p>Observação</p>
                                        </div>
                                        <p> {iten.obs}
                                        </p>
                                    </div>
                                    <div className="Relogio">
                                        <img className="imgRelogio" src={Cash} />
                                        <p className="LKWhatsapp"> R${iten.preco.toFixed(2)}</p><br/>
                                    </div>
                                </li>
                                <div className="D">
                                    <button className="Bt" onClick={Cancelar}>Cancelar</button>
                                    <button className="Bt" onClick={Finalizar}>finalizado</button>
                                </div>
                            </ul>
                            
                        );
                    })}
                </div>
                <div id="Buscados">
                    {Buscados.map((iten, key) =>{
                        var init = String(iten.hora);
                        var partesInicio = init.split('.');
                        var inicioFormatado = 0;//partesInicio[0]+':'+partesInicio[1];
                        if(partesInicio[1] === undefined){
                            inicioFormatado = partesInicio[0] + ":" + '00';
                        } else {
                            inicioFormatado = partesInicio[0]+':'+partesInicio[1];
                        }
                        console.log(partesInicio)
                        console.log(inicioFormatado, '<><><><><><<<<<<<>>>>>>><<<<<>>>><><><><><><><><><><><><');
                        // formatando a hora de término do serviço
                        var fim = String(iten.hora_termino);
                        var partesFim = fim.split('.');
                        var fimFormatado = 0;

                        if (partesFim[1] === undefined) {
                            fimFormatado = partesFim[0] + ":" + '00';
                        } else {
                            // Formata a parte dos minutos para garantir que tenha exatamente dois dígitos
                            var minutos = partesFim[1].slice(0, 2);
                            if (minutos.length === 1) {
                                minutos += '0';
                            }
                            fimFormatado = partesFim[0] + ':' + minutos;
                        }

                        console.log(fimFormatado);

                        //url whatsapp;
                        //'https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?'
                        var whatsapp = "https://api.whatsapp.com/send?phone=55"+iten.contato_cliente+"&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?"
                        return(
                            <ul id="ULb" key={iten.id}>
                                <li>
                                    <div id="DivHeaderAgenda"><br/>
                                        <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                                    </div>
                                    <br/>
                                    <div className="Relogio">
                                        <img className="imgRelogio" src={Relogio} />
                                        <p>{inicioFormatado} <br/> {fimFormatado}</p>
                                    </div>
                                    <div className="perfilCliente">
                                        <img className="imgRelogio" src={Perfil} />
                                        <p><br/>  {iten.nome_cliente}</p>
                                    </div>
                                    <div className="perfilCliente">
                                        <img className="imgRelogio" src={Whats} />
                                        <br/>
                                        <a target="_blank"
                                            rel='noreferrer'  
                                            href={whatsapp} 
                                            className="LKWhatsapp">{iten.contato_cliente} .
                                            </a>
                                    </div>
                                    <div className="perfilCliente">
                                        <img className="imgRelogio" src={Servico} />
                                        <p className="LKWhatsapp" > {iten.servico}</p>
                                    </div>
                                    <div id="OBS">
                                        <div id="TitleOBS">
                                            <p>Observação</p>
                                        </div>
                                        <p> {iten.obs}
                                        </p>
                                    </div>
                                    <div className="Relogio">
                                        <img className="imgRelogio" src={Cash} />
                                        <p className="LKWhatsapp"> R${iten.preco.toFixed(2)}</p><br/>
                                    </div>
                                    <div className="perfilCliente">
                                        <img className="imgRelogio" src={Status} />
                                        <p className="LKWhatsapp"> {iten.status_servico}</p>
                                    </div>
                                </li>
                            </ul>
                            
                        );
                    })}
                </div>
                <hr/>
                <div id="Relatorio">
                    <h3>Análise diaria</h3>
                    <br/>
                    <div id="Today">
                        <div>
                            <button className="btnValor" onClick={RelatorioDiarioFinalizado}>Buscar valores</button>
                            <h3>Finalizados</h3>
                            <br/>
                            Quantidade :<p id="quantF"> {} </p>
                            <br/>
                            valor Total :<p id="valorF"> {} </p>
                        </div>
                        <div>
                        <button className="btnValor" onClick={RelatorioDiarioCancelados}>Buscar valores</button>
                            <h3>Cancelados</h3>
                            <br/>
                            Quantidade :<p id="quantC"> {} </p>
                            <br/>
                            valor Total :<p id="valorC"> {} </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};