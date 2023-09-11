import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style_home.css';
import Logo from '../assets/Logo.png'
import Api from '../../services/api';

export default function Init(){
    const [salao, setSalao] = useState('');
    const History = useNavigate();
    
    const cpf_salao  = useParams();   
    useEffect(() =>{
        Api.post('/buscarsalao', cpf_salao).then((Response) =>{
            setSalao(Response.data);
            console.log(Response.data)              
        })
        
    }, []);

    function redirect(){
        // com fincionarios
        if(salao[0].imite_funcionarios > 0){
            localStorage.setItem("cpf_salao", salao[0].cpf_salao);
            localStorage.setItem("logo_salao", salao[0].logo_salao);
            localStorage.setItem("nome_salao", salao[0].nome_salao);
            History("/agendamentofuncionario");
        } else {
            localStorage.setItem("cpf_salao", salao[0].cpf_salao);
            localStorage.setItem("logo_salao", salao[0].logo_salao);
            localStorage.setItem("nome_salao", salao[0].nome_salao);
            //sem funcionarios.
            History("/agendamento");
        };
    };
    redirect();

    return(
        <div id="HomeConteiner">
            <header id="HeaderHome">
                <img src={Logo} alt="Logo"/>
                <h1>Seu guia de beleza</h1>
                
            </header>
            <div id="ConteudoHome">
                     
            </div>
        </div>
    );
};
