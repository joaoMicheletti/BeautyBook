import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style_home.css';
import Logo from '../assets/Logo.png'
import Api from '../../services/api';

export default function Init(){
    
    const { id } = useParams();    
    useEffect(() =>{
        Api.get('/listarsalao').then((Response) =>{ 
        })
    }, []);
    return(
        <div id="HomeConteiner">
            <header id="HeaderHome">
                <img src={Logo} alt="Logo"/>
                <h1>Seu guia de beleza</h1>
                
            </header>
            <div id="ConteudoHome">
                <hi>{id}</hi>
                     
            </div>
        </div>
    );
};
