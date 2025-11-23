import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import './style_init.css';
import Logo from '../assets/logoprovisor.webp';

import Api from '../../services/api';

export default function Init(){
    // por precaução caso o usuário selecione um salão e por alguma eventualidade volte para a pagina anterior
    // removeremos os dados que estarão armazenados no localstorage();
    localStorage.removeItem('cpf_salao');
    localStorage.removeItem('logo_salao');
    localStorage.removeItem('nome_salao');
    localStorage.removeItem('cpf_funcionario');
    localStorage.removeItem('idsalao');
    const History = useNavigate();
    const [ListaSalao, setListaSalao] = useState([]);
    const [nome_salao, setBuscar] = useState('');
    const [Buscados, setBuscados] = useState([]);
    useEffect(() =>{
        Api.get('/listarsalao').then((Response) =>{
            setListaSalao(Response.data);
        }).catch(() =>{
            alert('Erro ao carregar os salões.');
        })
    }, []);
    async function buscarParceiro() {  
        if(nome_salao === ''){
            alert('preencha o campo de busca');
        };
         
        var responsesDiv =  document.querySelector('#responseBusca');
        var respNegativa =  document.querySelector('#RespNegativa');
        var notApresent =  document.querySelector('.notApresent');
        //buscar o salão no database. e  apresentar na div response.
        var Data = {nome_salao}
        console.log(Data)
        await Api.post('/parceiros', Data).then((Response) =>{
            setBuscados(Response.data);
            console.log(Buscados.length)
            if(Buscados.length === 0){
                responsesDiv.style.display = 'block';
                notApresent.style.display = 'none';
                respNegativa.innerHTML = 'Nenhum parceiro encontrado.'
            } else {
                responsesDiv.style.display = 'block';
                //notApresent.style.display = 'block';
            };
        }).catch(() =>{
            alert('Erro ao carregar os salões.');
        });
        
        //responsesDiv.style.display = 'block'; 
    }
    return(
        <div id="HomeConteinerInit">
            <header className="header">
                <img className='logoTemp' src={Logo} alt='teste de logotipo'/>
                <nav className="menu">
                    <Link className='LK' to="/">Home</Link> 
                    <Link className='LK' to="/init">Parceiros</Link>                    
                    <Link className='LK' to="/registrosalao">Registrar-se</Link>
                    <Link className='LK' to="/loginsalao">Login</Link>                    
                </nav>
            </header>
            <h2 id="H">Conheça nossos parceiros</h2>
            <div id="Search">
                <input id="Buscar" type="text"  placeholder=" __Buscar por parceiro " onChange={(e) => setBuscar(e.target.value)}/>
                <input onClick={buscarParceiro} id="btnSearch" type="submet" value="Buscar"/>
            </div>
            <div id="responseBusca">
                <p id="RespNegativa"></p>
                <div className="notApresent" id="ConteudoHomeInit">
                    {Buscados.map((iten, key) => {
                        const URL = 'http://127.0.0.1:1998/image/';
                        const Agenda = () =>{
                            console.log(iten.quantidade_funcionarios);
                            console.log(iten.logo_salao);
                            if(iten.quantidade_funcionarios === null){
                                localStorage.setItem('cpf_salao', iten.cpf_salao);
                                localStorage.setItem('logo_salao', iten.logo_salao);
                                localStorage.setItem('nome_salao', iten.nome_salao);
                                History('/agendamento');
                            } else if(iten.quantidade_funcionarios > 0){
                                localStorage.setItem('cpf_salao', iten.cpf_salao);
                                localStorage.setItem('logo_salao', iten.logo_salao);
                                localStorage.setItem('nome_salao', iten.nome_salao);
                                History('/agendamentofuncionario');
                            } else {
                                alert('Erro interno.');
                            }
                        }
                        return(
                            <ul key={iten.id} onClick={Agenda}>
                                <img src={URL + iten.logo_salao} alt="logo"/>
                                <li>
                                    <h3 className="PConteudohome">
                                        {iten.nome_salao}
                                    </h3>
                                    <p className="PConteudohome">
                                        {iten.endereco} <br/>{iten.cep}
                                    </p>
                                    
                                </li>
                            </ul>
                        );
                    })} 
                </div>
            </div>
            <div id="ConteudoHomeInit">
                {ListaSalao.map((iten, key) => {
                    const URL = 'http://127.0.0.1:1998/image/';
                    const Agenda = () =>{
                        console.log(iten.quantidade_funcionarios);
                        console.log(iten.logo_salao);
                        if(iten.quantidade_funcionarios === null){
                            localStorage.setItem('cpf_salao', iten.cpf_salao);
                            localStorage.setItem('logo_salao', iten.logo_salao);
                            localStorage.setItem('nome_salao', iten.nome_salao);
                            History('/agendamento');
                        } else if(iten.quantidade_funcionarios > 0){
                            localStorage.setItem('cpf_salao', iten.cpf_salao);
                            localStorage.setItem('logo_salao', iten.logo_salao);
                            localStorage.setItem('nome_salao', iten.nome_salao);
                            History('/agendamentofuncionario');
                        } else {
                            alert('Erro interno.');
                        }
                    }
                    return(
                        <ul key={iten.id} onClick={Agenda}>
                            <img src={URL + iten.logo_salao} alt="logo"/>
                            <li>
                                <h3 className="PConteudohome">
                                    {iten.nome_salao}
                                </h3>                                
                            </li>
                        </ul>
                    );
                })} 
            </div>
        </div>
    );
};
