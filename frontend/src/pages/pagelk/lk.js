import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style_home.css';
import Logo from '../assets/Logo.png'
import Api from '../../services/api';

export default function Init(){
    const [salao, setSalao] = useState('');
    const [img, setImg] = useState('');
    const [nome, setNome] = useState('');
    const History = useNavigate();
    
    const cpf_salao  = useParams();

    useEffect(() =>{
        Api.post('/buscarsalao', cpf_salao).then((Response) =>{
            console.log(typeof(Response.data[0].quantidade_funcionarios));
            setSalao(Response.data[0].quantidade_funcionarios);
            setImg(Response.data[0].logo_salao);
            setNome(Response.data[0].nome_salao);
            console.log(salao > 0)            
        })
        
    }, []);
    console.log(salao > 0);
    function redirect(){
        // com fincionarios
        if(salao > 0){
            localStorage.setItem("cpf_salao", cpf_salao.cpf_salao);
            console.log(cpf_salao);
            localStorage.setItem("logo_salao", img);
            localStorage.setItem("nome_salao", nome);
            History("/agendamentofuncionario");
        } else {
            localStorage.setItem("cpf_salao", cpf_salao.cpf_salao);
            localStorage.setItem("logo_salao", img);
            localStorage.setItem("nome_salao", nome);
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
