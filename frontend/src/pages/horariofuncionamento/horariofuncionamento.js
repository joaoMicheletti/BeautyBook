import React, {useEffect, useState} from "react";
import Api from '../../services/api'; 
import Logo from '../assets/Logo.png'
import './style_horario.css';
import {FcCalendar, FcServices, FcAlarmClock, FcInvite, FcSettings} from 'react-icons/fc';
import {GrUserWorker} from 'react-icons/gr';

export default function HorarioDeFuncionamento(){
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
                alert('Erro ao Buscar Horários de Serviços');
            };
        }).catch((Erro) =>{
            alert('Erro ao Buscar Horários de Serviço.');
        });
    }, []);
    
    const Registrar = async (e) =>{
        e.preventDefault();
        if(dia.length === 0){
            alert('Selecione um dia!');
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
    return(
        <div id="PainelSalao">
            <header id="HeaderSalao">
                <img id="LogoSalao" src={Logo} alt="LOgoSalão"/>
                <h1 id="TitleSalao" >Nome Salão</h1>
            </header>
            <hr/>
            <div id="ButtonsMenuSalao">
                <div id='DivAganda' className="DivMenu">
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
                                console.log(Response.data);
                            }).catch((Erro) => {
                                alert('Erro ao editar  o Horário.');
                            })
                        };
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
                            </li>
                        </ul>
                    );
                })}
                </div>
            </section>
        </div>
    );
};