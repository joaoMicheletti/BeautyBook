import React, {useEffect, useState}from "react";
import Api from "../../services/api";
import {useNavigate} from 'react-router-dom'
import './style.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';
import{FiLogOut} from 'react-icons/fi';

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
    const Data = {
        dia, mes, ano, cpf_salao
    };
    Api.post('/assinatura', {cpf_salao}).then((Response) => {
        if(Response.data[0].assinatura_status !== 'on'){
            alert('Sua assinatura expirou, contrate nosso serviço novamente.');
            History('/planos')
        }
    }).catch((Erro) => {
        alert('Erro ao validar sua assinatura!');
    });
    
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
                    <a id='Agenda' className="BtnMenu" href="/painel"><FcCalendar/></a>
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
            <section id="SectionAgendaSalao">

                <h1 id="TitleAgenda">Agenda</h1>

                <div id="ConteinerAgenda">
                    <div id="DiaMesAno">
                         <input id="SelectMes" type="date"></input>
                         <button id="BtnAgenda" type="sybmit">Buscar</button>
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
                                alert(Response.data);

                            }).catch(() =>{
                                alert('Erro interno.')
                            });
                        };

                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                                    <br/>
                                    <p>Horário : {iten.hora}  AS {iten.hora_termino}</p>
                                    <p>Cliente :  {iten.nome_cliente}</p>
                                    <p>WhatsApp Cliente : </p> 
                                    <a target="_blank"
                                    rel='noreferrer'  
                                    href='https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?' 
                                    className="LKWhatsapp">{iten.contato_cliente}</a>
                                    <br/>
                                    <br/>
                                    <p> Funcionário : {iten.nome_completo}</p>
                                    <p>Serviços :  {iten.servico}</p>
                                    <p>Observação : {iten.obs}
                                    </p>
                                    <br/>
                                    <p className="UnderLine">Valro Serviço : {iten.preco} _R$</p><br/>
                                    <div className="DivStatus">
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