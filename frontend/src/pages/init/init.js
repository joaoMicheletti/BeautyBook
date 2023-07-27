import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './style_home.css';
import Logo from '../assets/Logo.png'
import Api from '../../services/api';

export default function Init(){
    const History = useNavigate();
    const [ListaSalao, setListaSalao] = useState([]);
    useEffect(() =>{
        Api.get('/listarsalao').then((Response) =>{
            setListaSalao(Response.data);
            console.log(Response.data);
        }).catch(() =>{
            alert('Erro ao carregar os salões.');
        })
    }, []);
    return(
        <div id="HomeConteiner">
            <header id="HeaderHome">
                <img src={Logo} alt="Logo"/>
                <h1>Seu guia de beleza</h1>
            </header>
            <div id="ConteudoHome">
                <h2>Selecione o Salão.</h2>
                {ListaSalao.map((iten, key) => {
                    const Agenda = () =>{
                        console.log(iten.quantidade_funcionarios);
                        if(iten.quantidade_funcionarios === null){
                            localStorage.setItem('cpf_salao', iten.cpf_salao);
                            History('/agendamento');
                        } else if(iten.quantidade_funcionarios > 0){
                            localStorage.setItem('cpf_salao', iten.cpf_salao);
                            History('/agendamentofuncionario');
                        } else {
                            alert('Erro interno.');
                        }
                    }
                    return(
                        <ul key={iten.id}>
                            <li>
                                <p className="PConteudohome">
                                    Salão : {iten.nome_salao}
                                </p>
                                <p className="PConteudohome">
                                    Endereço : {iten.endereco} <br/>
                                    CEP : {iten.cep}
                                </p>
                                <button className="BtnConteudoHome"
                                onClick={Agenda}>Ver agenda</button>
                            </li>
                        </ul>
                    );
                })}
                     
            </div>
        </div>
    );
};
