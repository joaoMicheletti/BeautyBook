import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import './painelfuncionario.css';
import{FiLogOut} from 'react-icons/fi';
import Relogio from '../assets/relogio.png';
import Perfil from '../assets/perfil.png';
import Whats from '../assets/whats.png';
import Servico from '../assets/servico.png';
import Cash  from '../assets/cash.png';
import Status from '../assets/status.png';
export default function PainelFuncionario(){
    const History = useNavigate();
    const DataAtual = new Date();// oibjeto data atual;
    //o servidor espera receber semaradamente o diam, mes e ano,
    var dia = parseInt(DataAtual.getDate(), 10);
    var mes = parseInt(DataAtual.getMonth(), 10) + 1;
    var ano = parseInt(DataAtual.getFullYear(), 10); 
    //pegando do storage o cpf do salão;
    var cpf_funcionario = localStorage.getItem('cpf_funcionario');
    const [Agendados, setAgendados] = useState([]);
    const [Buscados, setBuscados] =  useState([]);
    const Data = {
        dia, mes, ano, cpf_funcionario
    };
    function Buscar(){
        // escondendo a div agendados
        document.querySelector('.ContainerAgenda').style.display = 'none';
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
            dia, mes, ano, cpf_funcionario
        };
        console.log(Data);
        Api.post('/buscafuncionario', Data).then((Response) => {
            if ( Response.data === 'nenhum agendamento encontrado.'){
                alert(Response.data);
            } else{
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
    function Exit(){
        localStorage.removeItem('cpf_salao');
        localStorage.removeItem('cpf_funcionario');
        alert('Até Breve');
        History('/');
        console.log('exit');
    };
    return(
        <div id='corpo'>
            <header className='cabeçalho'>
                <br/>
                <h5 id="TitleFuncionario" >Olá Colaborador.</h5>
                <button  onClick={Exit} id='Agenda' className="BtnExit" href="/painel"><FiLogOut/></button>
            </header>
            <br/>
            <br/>
            <div className='ContainerAgenda'>
                {Agendados.map((iten, key) =>{
                    var whatsapp = "https://api.whatsapp.com/send?phone=55"+iten.contato_cliente+"&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?"
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
                //funções de cancelar e finalizar;
                //cancelar;
                const Cancelar = async (e) =>{
                    var id = iten.id;
                    var Data = {
                        id
                    };                            
                    await Api.put('/cancelarservico', Data).then((Response) =>{
                        alert(Response.data);
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
                        await Api.put('/finalizarservico', Data).then((Response) =>{
                            alert(Response.data);
                            window.location.reload(true);
                        }).catch(() =>{
                            alert('Erro interno.')
                        });
                    };
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
                                    <p> {iten.obs}</p>
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
                        //url whatsapp;
                        //'https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?'
                        var whatsapp = "https://api.whatsapp.com/send?phone=55"+iten.contato_cliente+"&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?"
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                                    <br/>
                                    <p>Início: {inicioFormatado} <br/> Término: {fimFormatado}</p>
                                    <p>Cliente:  {iten.nome_cliente}</p>
                                    <p>WhatsApp Cliente: </p> 
                                    <a target="_blank"
                                    rel='noreferrer'  
                                    href={whatsapp} 
                                    className="LKWhatsapp">{iten.contato_cliente}</a>
                                    <br/>
                                    <br/>
                                    <p>Serviços :  {iten.servico}</p>
                                    <p>Observação : {iten.obs}
                                    </p>
                                    <br/>
                                    <p className="UnderLine">Valro Serviço: R$ {iten.preco.toFixed(2)}</p><br/>
                                    <p> Status: {iten.status_servico} </p>
                                </li>
                            </ul>
                            
                        );
                    })}
                </div>
        </div>
    );
};