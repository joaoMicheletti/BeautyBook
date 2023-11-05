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
    return(
        <div id="PainelSalao">
            <header id="HeaderSalao">
                <h1 id="TitleSalao" >Agenda de funcionários</h1>
            </header>
            <hr/>
            <section id="SectionFuncionarioAgenda">
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
                        //formatando hora de inicio;
                        var init = String(iten.hora);
                        var partesInicio = init.split('.');
                        var inicioFormatado = partesInicio[0]+':'+partesInicio[1];
                        //formatando hora do termino;
                        var fim = String(iten.hora_termino);
                        var partesFim = fim.split('.');
                        var fimFormatado = partesFim[0]+':'+partesFim[1];
                        return(
                            <ul key={iten.id}>
                                <li>
                                    <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                                    <br/>
                                    <p>Início: {inicioFormatado}<br/>  Término: {fimFormatado}</p>
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
                                    <p className="UnderLine">Valro Serviço : R$ {iten.preco.toFixed(2)}</p><br/>
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