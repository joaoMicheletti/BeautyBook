import React, {useEffect, useState} from "react";
import Api from '../../services/api'; 
import './style_horario.css';
import { useNavigate } from "react-router-dom";

import { FaCalendar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import {LuArrowRightLeft } from "react-icons/lu";


export default function HorarioDeFuncionamento(){
    const Url = "https://beautybookts-production.up.railway.app/image/";
    const History = useNavigate();
    //referência ao salão 
    const cpf_salao = localStorage.getItem('cpf_salao');
    Api.post('/assinatura', {cpf_salao}).then((Response) => {
        console.log(Response);
        if(Response.data === false){
            alert('Seus dias de acesso livre a plataforma acabaram, contrate um plano.');
            History('/planos')
        } else if(Response.data === true){
            console.log(Response.data);
        } else if(Response.data === null){
            alert('Seu plano encontra-se "Expirado", regularize para ter acesso a plataforma.')
            History('/planos')
        };
    }).catch(() => {
        alert('Erro ao validar sua assinatura!');
    });
    //variaveis para o form
    const [dia, setDia] = useState('');
    const [Inicio_trabalhos, setInicio] = useState('');
    const [Fim_trabalhos, setTermino] = useState('');
    var inicio_trabalhos = parseFloat(Inicio_trabalhos.replace(':', '.'), 10);
    var fim_trabalhos = parseFloat(Fim_trabalhos.replace(':', '.'), 10)
    //objeto para req de registro;
    const Data = {
        cpf_salao, dia, inicio_trabalhos, fim_trabalhos
    };
    //resposta da req useEffect
    const [ListaHorarios, setlitaHorarios] = useState([]);
    //objeto para req do useEffect();
    const DATA = {
        cpf_salao
    };
    useEffect(() =>{
        Api.post('/listarhorariofuncionamento', DATA).then((Response) => {
            setlitaHorarios(Response.data);
            if(Response.data.length === 0){
            };
        }).catch((Erro) =>{
            alert('Erro ao Buscar Horários de Serviço.');
        });
    }, []);
    
    const Registrar = async (e) =>{
        e.preventDefault();
        if(dia.length === 0){
            alert('Selecione um dia!');
        } else if(dia === 'selecione um dia'){
            alert('Selecione um dia');
        } else if(Inicio_trabalhos.length === 0){
            alert(' Selecione uma Hora de Início!');
        } else if(Fim_trabalhos.length === 0){
            alert('Selecione um hora de Término!');
        } else {
            await Api.post('/horariofuncionamento', Data).then((Response) =>{
            if(Response.data.length === 0){
                alert('Erro ao registra horario');
            } else {
                window.location.reload();
            }
            }).catch((Erro) =>{
                alert('Erro ao Rgistrar Horário.');
            });  
        };
    };
    const [infoSalao, setinfoSalao] = useState([]);
    useEffect(() => {
        Api.post('/buscarsalao', {cpf_salao}).then((Response) => {
            setinfoSalao(Response.data);
        }).catch((Erro) =>{
            alert('erro ao buscar oformações do salão');
        });
    }, []);
    
    const Exit = (e) => {
        e.preventDefault();
        localStorage.removeItem(cpf_salao);
        alert('Até breve');
        History('/loginsalao');
    };// encoler menu 
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
            <section id="SectionHorarios">
                <h1 id='TitleHorarios'>Horário de funcionamento</h1>
                <div id="Form_dias">
                    <form onSubmit={Registrar}>
                        <label >Dia da Semana:</label>
                        <select name="dia" id="dia" onChange={(e) => setDia(e.target.value)}>
                        <option value="selecione um dia">Selecione um dia</option>
                        <option value="Segunda-feira">Segunda-feira</option>
                        <option value="Terça-feira">Terça-feira</option>
                        <option value="Quarta-feira">Quarta-feira</option>
                        <option value="Quinta-feira">Quinta-feira</option>
                        <option value="Sexta-feira">Sexta-feira</option>
                        <option value="Sábado">Sábado</option>
                        <option value="Domingo">Domingo</option>
                        </select><br></br>
                        <label >Hora de Início:</label>
                        <input type="time" id="inicio"
                        onChange={(e) => setInicio(e.target.value)}></input><br/>
                        <label >Hora de Término:</label>
                        <input type="time" id="termino"
                        onChange={(e) => setTermino(e.target.value)}></input>
                        <br/>
                        <button type="submit" id="Btn_cad">Cadastrar</button>
                        <br/>
                        <br/>
                    </form>
                </div>
                <div id="DivHorarios">
                {ListaHorarios.map((iten, key) => {
                    // editar Hora;
                    const Editar = async () => {
                        alert('ao inves de usar ( : ) use o ( . )');
                        var inicio_trabalhos = parseFloat(prompt("Novo Horário de início ? :"), 10);
                        var fim_trabalhos = parseFloat(prompt('Novo Horário de Término ? :'), 10);
                        var dia = iten.dia;
                        var cpf_salao = localStorage.getItem('cpf_salao');
                        const Data = {
                            cpf_salao,
                            inicio_trabalhos,
                            fim_trabalhos,
                            dia
                        };
                        if(isNaN(inicio_trabalhos)){
                            alert('Os dados fornecidos não são validos.');
                        } else if( isNaN(fim_trabalhos)){
                            alert('Os dados fornecidos não são validos.');
                        } else {
                            await Api.put('/horariofuncionamento', Data).then((response) => {
                                if(response.data === 'Atualizado'){
                                    window.location.reload();
                                }else {
                                    alert('erro ao atulizar o Horário')
                                }
                                console.log(response)
                            }).catch((Erro) => {
                                alert('Erro ao editar  o Horário.');
                            })
                        };
                    };
                    //eletar Horário.
                    const Deletar = async () => {
                        var id = iten.id;
                        const Data = {
                            id
                        };
                        Api.put('/deletarhorario', Data).then((Response) => {
                            if(Response.data === 'Deletado'){
                                window.location.reload();
                            } else {
                                alert('Erro ao Deletar.');
                            }
                        }).catch((Erro) => {
                            alert('Erro ao Deletar Horário.');
                        });
                        console.log(Data);
                    };
                    return(
                        <ul key={iten.id}>
                            <li>
                                <p className="DiaSemana">{iten.dia}</p>
                                <p className="DiaSemana">{iten.inicio_trabalhos}</p>
                                <p className="DiaSemana">às</p>
                                <p className="DiaSemana">{iten.fim_trabalhos}</p>
                                <button
                                type="submit"
                                className="BtnHorario"
                                onClick={Editar}>Editar</button>
                                <button
                                type="submit"
                                className="BtnHorario"
                                onClick={Deletar}>Excluir</button>
                            </li>
                        </ul>
                    );
                })}
                </div>
            </section>
        </div>
    );
};