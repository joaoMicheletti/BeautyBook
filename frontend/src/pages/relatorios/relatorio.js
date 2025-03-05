import React, {useEffect, useState}from "react";
import Api from "../../services/api";
import { FaCalendar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import "./relatorio.css";



export default function Painel(){
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
    const Url = "http://127.0.01:1998/image/";
    const Exit = (e) => {
        e.preventDefault();
        localStorage.removeItem(cpf_salao);
        alert('Até breve');
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
                console.log(Response)
                setRelatorio("ai ai ai ai ai  essse amoe é bom de mais",Response.data)
            })
            .catch((err)=>{
                alert('Erro ao comunicar-se copm o servidor')
            })
            console.log(Data)
        };           
    };
    
    return(
        <div id="pagRelatorios">
            {infoSalao.map((iten, key) =>{
                return(
                    <header key={iten.id} id="HeadePainel">
                        <div id="UsserHead">
                            <img id="LogoSalaoPainle" src={Url + iten.logo_salao} alt="LOgoSalão"/>
                        </div>
                        <div className="LinksPage" id="LKpainel">
                            <FaCalendar color="#5e5e74" size={30} />
                            <a href="/painel">Agenda</a>
                        </div>
                        <div className="LinksPage">
                            <MdOutlineMiscellaneousServices color="#5e5e74" size={30} />
                            <a href="/servicos">Serviços</a>
                        </div>
                        <div className="LinksPage">
                            <IoIosPeople color='#5e5e74' size={30} />
                            <a href="/funcionarios">Funcionários</a>
                        </div>
                        <div className="LinksPage">
                        
                            <FaClock  color='#5e5e74' size={30} />
                            <a href="/funcionamento">Horários</a>
                        </div>
                        <div className="LinksPage">
                            <IoSend color='#5e5e74' size={30} />
                            <a href="/convidarcliente">Indique</a>
                        </div>
                        <div className="LinksPage">
                            <IoSettings color="#5e5e74" size={30}/>
                            <a href="/ajustes">Ajustes</a>
                        </div>
                        <div className="LinksPage">
                            <FaClipboardList color="#5e5e74" size={30} />
                            <a href="/relatorios">Relatórios</a>
                        </div>
                        <div className="LinksPage">
                            <ImExit color="#5e5e74" size={30} />
                            <a onClick={Exit}>Sair</a>
                        </div>
                    </header>
                );
            })}
            <section id="SectionAgendaSalaoPainel">
                <br/>
                <div id="ConteinerAgendaPainel">
                    <IoMdNotifications color="#5e5e74" size={30} />
                </div>
            </section>
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
        </div>
    );
};