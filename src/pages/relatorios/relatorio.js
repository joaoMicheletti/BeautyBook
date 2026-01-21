import React, {useEffect, useState, }from "react";
import Api from "../../services/api";
import { FaCalendar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import "./relatorio.css";
import { useNavigate } from "react-router-dom";
import {LuArrowRightLeft } from "react-icons/lu";




export default function Painel(){
    const Url = "https://beautybookts-production.up.railway.app/image/";
    const History = useNavigate();
    const [periodo, setPeriodo] = useState('');
    const [inicio, setInicio] = useState('');
    const [relatorio, setRelatorio] = useState('');
    var cpf_salao = localStorage.getItem('cpf_salao');
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
    
    const Exit = (e) => {
        e.preventDefault();
        localStorage.removeItem(cpf_salao);
        History('/loginsalao');
    };
    async function Buscar(){
        if(periodo === ''){
            alert('Selecione o periódo');
        } else if (inicio === ''){
            alert('Selecione uma Data');
        } else {
            var sep = inicio.split('-');
            var Data = {
                cpf_salao,
                periodo,
                inicio: `${sep[2]}/${sep[1]}/${sep[0]}`
            }
            await Api.post('/relatoriodiario', Data).then((Response) =>{
                console.log(Response.data.resp)

                var servicos = [];
                var v = 0;

                while (v < Response.data.resp.length) {
                    if (servicos.includes(Response.data.resp[v].servico)) { // Corrigido: uso de includes() corretamente
                        console.log('Nada aqui');
                    } else {
                        servicos.push(Response.data.resp[v].servico); // Agora adiciona ao array corretamente
                    }
                    v += 1;
                };
                var p = 0;
                while (p < servicos.length){
                    document.querySelector("#pServico").innerHTML +=`${servicos[p]}<br/>`;
                    p+=1
                }
                var quantidadeServiso = Response.data.resp.length;
                document.querySelector("#TotAgendados").innerHTML = quantidadeServiso

                var finalizados = 0;
                var i = 0;
                while (i < Response.data.resp.length){
                    if(Response.data.resp[i].status_servico === 'finalizado'){
                        finalizados += 1;
                    };
                    i += 1
                };
                document.querySelector("#TotFinalizados").innerHTML = finalizados;

                var cancelados = 0;
                var I = 0;
                while (I < Response.data.resp.length){
                    if(Response.data.resp[I].status_servico === 'cancelado'){
                        cancelados += 1;
                    };
                    I += 1
                };
                document.querySelector("#TotCancelados").innerHTML = cancelados;

                var valorTot = 0;
                var II = 0;
                while (II < Response.data.resp.length){
                    valorTot += Response.data.resp[II].preco;
                    II += 1
                };
                document.querySelector("#TotValor").innerHTML = `R$${valorTot.toFixed(2)}`;

            })
            .catch((err)=>{
                alert('Erro ao comunicar-se copm o servidor')
            })
            console.log(Data)
        };           
    };
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
        <div id="pagRelatorios">
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
            <br/>
            <div id="notificationrelatorio">
            </div>
            <section id="sectionRelatorios">
                <h1 id="TitleRelatorio">Relatório de serviços</h1>
                <div id="menuRelatorio">
                    <select onChange={(e) => setPeriodo(e.target.value)} name="options" id="op">
                        <option value="selecionar">Selecionar</option>
                        <option value="dia">Dia</option>
                        <option value="mes">Mes</option>
                        <option value="ano">Ano</option>
                    </select>
                    <input onChange={(e) => setInicio(e.target.value)} type="date"></input>
                    <input onClick={Buscar} type="button" value="Buscar"></input>
                </div>
            </section>
            <section id="responseRelatorio">
                <div id="relatorioservicos">
                    <div id="listaServicos">
                        <p id="pServico"></p>
                    </div>
                    <div id="listaQuantidade">
                        <div className="subListaQuantidade">
                            <p>Total Agendados</p>
                            <p id="TotAgendados">X</p>
                        </div>
                        <div className="subListaQuantidade">
                            <p>Total Finalizados</p>
                            <p id="TotFinalizados">X</p>
                        </div>
                        <div className="subListaQuantidade">
                            <p>Total Cancelados</p>
                            <p id="TotCancelados">X</p>
                        </div>
                        <div className="subListaQuantidade">
                            <p>Valor Total</p>
                            <p id="TotValor">X</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};