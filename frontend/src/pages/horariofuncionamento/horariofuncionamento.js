import React, {useEffect, useState} from "react";
import Api from '../../services/api'; 
import './style_horario.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
import{FiLogOut} from 'react-icons/fi';

export default function HorarioDeFuncionamento(){
    const History = useNavigate();
    //referência ao salão 
    const cpf_salao = localStorage.getItem('cpf_salao');
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
                alert('não encontramos Horários cadastrados.');
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
                alert('Registrado com Sucesso!');
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
                <div id='DivAganda' className="DivMenu" style={{backgroundColor: "transparent"}}>
                    <a id='Agenda' className="BtnMenu" href="/painel"><FcCalendar/></a>
                </div>
                <div id='DivServicos'className="DivMenu">
                    <a id="Services" className="BtnMenu" href="/servicos"><FcServices/></a>                    
                </div>
                
                <div id="DivFuncionarios" className="DivMenu" >
                    <a id="Funcionarios" className="BtnMenu" href="/funcionarios"><GrUserWorker/></a>
                </div>
                <div className="DivMenu" style={{backgroundColor: "white"}}>
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
                        Api.post('/deletarhorario', Data).then((Response) => {
                            if(Response.data > 0){
                                alert('Deletado com sucesso.');
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
                                <p className="DiaSemana">Abre as : </p>
                                <p className="DiaSemana">{iten.inicio_trabalhos}</p>
                                <p className="DiaSemana">Fecha as :</p>
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