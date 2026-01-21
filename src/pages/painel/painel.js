import React, {useEffect, useState}from "react";
import Api from "../../services/api";
import {useNavigate} from 'react-router-dom'
import './style.css';
import Whats from '../assets/whats.png';
import Servico from '../assets/servico.png';
import Cash  from '../assets/cash.png';
import Status from '../assets/status.png';
import { FaCalendar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { LuPanelTopClose, LuArrowRightLeft } from "react-icons/lu";





export default function Painel(){
    

    // >>> LÓGICA ADICIONADA (SEM ALTERAR O RESTO)
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
    navigator.userAgent
    );

    const isWebView = /(Instagram|FBAN|FBAV|Line|Twitter)/i.test(
    navigator.userAgent
    );
    // <<< FIM DA LÓGICA ADICIONADA

    if ('serviceWorker' in navigator && !isMobile && !isWebView) {
    navigator.serviceWorker
        .register('/service-work.js', {scope: '/'})
        .then(async serviceWorker => {
        let subscription = await serviceWorker.pushManager.getSubscription();
        console.log("primeira",subscription)
        // se não tiver sobscriptio registre-a e mande ao servidor para ser salva.
        if (!subscription) {
            const publicKeyResponse = await Api.get('/publickkey');
            console.log(publicKeyResponse);

            subscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKeyResponse.data,
            });
            // enviar a subcriptiona o servidor.
            let Datanotification = {
                subscription: subscription,
                idUser: localStorage.getItem('cpf_salao')
            }
            let a = await Api.post('notifications/check', Datanotification);
            console.log(a)
        } // se tem verificar se esta ativa ou atualizar.


        console.log('segunda',subscription);
        })
        .catch(() => {
        // erro silenciado para não quebrar produção
        });
    }


    const Url = "https://beautybookts-production.up.railway.app/image/";
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
    //validando assinatura.
    Api.post('/assinatura', {cpf_salao}).then((Response) => {
        //console.log("ai ai ai ai ", Response)
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
        document.querySelector('#Calendario').style.display = 'none'; // ajustar para selector da agenda
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
            //console.log(Response, '<><><>',infoSalao);
           // console.log(Response.data);
        }).catch((Erro) =>{
            alert('erro ao buscar oformações do salão');
        });
    }, []);

    const [notifications, setNotifications] = useState([]);
    //effect para buscar as notificaçõe:
    let dados = {
        token: cpf_salao
    }
    setTimeout(() => {
        // código a ser executado
        async function notification() {
            await Api.post('/buscarnotifications', dados).then((Response) => {
                console.log('resposta da notificação', Response.data)
                setNotifications(Response.data)
                console.log("aquio esta o objeto com o state:", notifications)

            }).catch((erro) =>{
                alert('Erro interno..');
            });
        }
        
        notification()
    }, 4000);
    
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
    //calendario funcionalidades:
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };
    
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
    
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    const handleDayClick = (day) => {
        const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(fullDate);
        var dia = day;
        var mes = currentDate.getMonth() + 1;
        var ano = currentDate.getFullYear();
        var Data = {dia, mes, ano, cpf_salao}
        console.log("Data selecionada:", Data); // Aqui você pode executar qualquer ação necessária
        Api.post('/buscasalao', Data).then((Response) => {
            console.log(Response)
            if(Response.data.res === 'nenhum agendamento encontrado.'){
                alert(Response.data.res)
            } else {
                setBuscados(Response.data);
                document.querySelector('#Calendario').style.display = 'none'; // ajustar para selector da agenda
                // mostrando a div Buscados 
                document.querySelector('#Buscados').style.display = 'flex';
            };
            
        }).catch((Erro) => {
            alert('Erro ao cominicar-se com o ');
        });
      };
    const renderDays = () => {
        const days = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        
        for (let i = 0; i < firstDay; i++) {
          days.push(<div key={`empty-${i}`} className="dia empty"></div>);
        }
        
        for (let day = 1; day <= totalDays; day++) {
            days.push(
              <div 
                key={day} 
                className={`dia ${selectedDate && selectedDate.getDate() === day ? "selected" : ""}`} 
                onClick={() => handleDayClick(day)}
              >
                <p>{day}</p>
              </div>
            );
          }
        
        return days;
    };
    //mostrar div de notificação:
    function showNotifications(){
        let elemento = document.querySelector('.notificationCorpo');
        elemento.style.display = 'block'
    };
    // fechar area de notificação:
    function closeNotification(){
        let elementoClose = document.querySelector('.notificationCorpo');
        elementoClose.style.display = 'none'
    }
     async function check(e){
        console.log('logde chacccccc', e);
        let DATA = {
            id: e,
        }
        await Api.post('/checkNotifications', DATA)
        
    }
    // encoler menu 
    function encolher() {
        const menus = document.querySelectorAll('.LinksPage');
        const links = document.querySelectorAll('.aLink');

        menus.forEach(menu => {
            const expandido = menu.dataset.expandido === 'true';

            if (expandido) {
                // ENCOLHER MENU
                menu.style.width = '100%';
                menu.dataset.expandido = 'false';

                // ESCONDER TEXTO
                links.forEach(link => {
                    link.style.display = 'none';
                });
            } else {
                // EXPANDIR MENU
                menu.style.width = '100%';
                menu.dataset.expandido = 'true';

                // MOSTRAR TEXTO
                links.forEach(link => {
                    link.style.display = 'block';
                });
            }
        });
    }


    
    return(
        <div id="PainelSalao">
            {infoSalao.map((iten, key) =>{
                return(
                    <header key={iten.id} id="HeadePainel">
                        <div id="UsserHead">
                            <img id="LogoSalaoPainle" src={Url + iten.logo_salao} alt="LOgoSalão"/>
                            <LuArrowRightLeft onClick={encolher} className="incoledor" color="#ffffff" size={40}/>
                        </div>
                        <div  className="LinksPage" id="LKpainel">
                            <a href="/painel"> <FaCalendar className="iconbarra" color="#5e5e74" size={30} /></a>
                            <a className='aLink' href="/painel">Agenda</a>
                        </div>
                        <div href="/servicos" className="LinksPage">
                            <a href="/servicos"><MdOutlineMiscellaneousServices className="iconbarra" color="#5e5e74" size={30} /></a>
                            <a className='aLink' href="/servicos">Serviços</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/funcionarios"><IoIosPeople className="iconbarra" color='#5e5e74' size={30} /></a>
                            <a className='aLink' href="/funcionarios">Funcionários</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/funcionamento"><FaClock className="iconbarra"  color='#5e5e74' size={30} /></a>
                            <a className='aLink' href="/funcionamento">Horários</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/convidarcliente"><IoSend className="iconbarra" color='#5e5e74' size={30} /></a>
                            <a className='aLink' href="/convidarcliente">Indique</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/ajustes"><IoSettings className="iconbarra" color="#5e5e74" size={30}/></a>
                            <a className='aLink' href="/ajustes">Ajustes</a>
                        </div>
                        <div className="LinksPage">
                            <a href="/relatorios"><FaClipboardList className="iconbarra" color="#5e5e74" size={30} /></a>
                            <a className='aLink' href="/relatorios">Relatórios</a>
                        </div>
                        <div className="LinksPage">
                            <ImExit className="iconbarra" onClick={Exit}  color="#5e5e74" size={30} />
                            <a className='aLink' onClick={Exit}>Sair</a>
                        </div>
                    </header>
                );
            })}
            <section id="SectionAgendaSalaoPainel">
                <br/>
                <div id="ConteinerAgendaPainel">
                    <div id="DiaMesAno">
                        <input id="SelectMes" type="date" placeholder="DATA"></input>
                        <button id="BtnAgenda" onClick={Buscar}>Buscar</button>
                    </div>
                    <IoMdNotifications onClick={showNotifications} className="iconNotification" color="#5e5e74" size={30} />
                    <p className="notificationNmber">{notifications.length}</p>
                    <div className="notificationCorpo">
                        <button onClick={closeNotification} className="btnNotification">
                            <LuPanelTopClose color="#ffffff" size={30} />
                        </button>
                        {notifications.map((iten, key) =>{
                            return(
                                <div key={iten.id} className="conteudoNitfication">
                                    <div className="espacos">
                                        <IoMdNotifications color="#5e5e74" size={30} />
                                    </div>
                                    <div className="espacos">
                                        <p className="corpoTexto">{iten.corpoNotification}</p>
                                    </div>
                                    <div className="espacos">
                                        <FaCheckSquare onClick={() => check(iten.id)} className="checkbtn" color="#5e5e74" size={30} />
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>

                </div>
                <br/>
                <hr/>
                <br/>
                <div id="Calendario">
                    <div id="headerCalendario">
                        <p id="TitleCalandario">
                        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                            </p>
                        <div id="BtnHeadeCalandario">
                            <button id="befor"onClick={goToPreviousMonth}>&lt;&lt;</button>
                            <button id="Next" onClick={goToNextMonth}>&gt;&gt;</button>
                        </div>
                    </div>
                    <div id="diaSemana">
                        <p>Domingo</p>
                        <p>Segunda-Feira</p>
                        <p>Terça-Feira</p>
                        <p>Quarta-Feira</p>
                        <p>Quinta-Feira</p>
                        <p>Sexta-Feira</p>
                        <p>Sábado</p>
                        
                    </div>
                    <div className="eixoXCalendario">{renderDays()}</div>
                
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
                                    <p  >
                                        {iten.dia} / {iten.mes} / {iten.ano}
                                    </p>
                                    </div>
                                    <br/>
                                    <div  className="Relogio">
                                        <p className="LKWhatsapp"> {iten.status_servico}</p><br/>
                                    </div>
                                    <div className="Relogio">
                                        <FaClock  color='#5e5e74' size={20} />
                                        <p>{inicioFormatado} - {fimFormatado}</p>
                                    </div>
                                    <div className={`some-${iten.id}`}>
                                        <div  className="perfilCliente">
                                            <img className="imgRelogio" src={Whats} />
                                            <br/>
                                            <a target="_blank"
                                                rel='noreferrer'  
                                                href={whatsapp} 
                                                className="LKWhatsapp">{iten.contato_cliente} 
                                            </a>
                                        </div>
                                        <div  className="perfilCliente">
                                            <img className="imgRelogio" src={Servico} />
                                            <p className="LKWhatsapp" > {iten.servico}</p>
                                        </div>
                                        <div  className="Relogio">
                                            <img className="imgRelogio" src={Cash} />
                                            <p className="LKWhatsapp"> R${iten.preco.toFixed(2)}</p><br/>
                                        </div>
                                        <div className="perfilCliente">
                                            <img className="imgRelogio" src={Status} />
                                            <p className="LKWhatsapp"> {iten.status_servico}</p>
                                        </div>
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
                                    <div  id="DivHeaderAgenda"><br/>
                                    <p className="UnderLine">
                                        {iten.dia}/{iten.mes}/{iten.ano}
                                    </p>
                                    </div>
                                    <br/>
                                    <div className="Relogio">
                                        <FaClock  color='#5e5e74' size={30} />
                                        <p>{inicioFormatado} <br/> {fimFormatado}</p>
                                    </div>
                                    <div className={`some-${iten.id}`}>
                                        <div  className="perfilCliente">
                                            <img className="imgRelogio" src={Whats} alt="ll" />
                                            <br/>
                                            <a target="_blank"
                                                rel='noreferrer'  
                                                href={whatsapp} 
                                                className="LKWhatsapp">{iten.contato_cliente} 
                                                </a>
                                        </div>
                                        <div className="perfilCliente">
                                            <img className="imgRelogio" src={Servico} alt="lll"/>
                                            <p className="LKWhatsapp" > {iten.servico}</p>
                                        </div>
                                        <div className="perfilCliente">
                                            <img className="imgRelogio" src={Status} />
                                            <p className="LKWhatsapp"> {iten.status_servico}</p>
                                        </div>
                                        <div className="Relogio">
                                            <img className="imgRelogio" src={Cash} alt="lll" />
                                            <p className="LKWhatsapp"> R${iten.preco.toFixed(2)}</p><br/>
                                        </div>
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