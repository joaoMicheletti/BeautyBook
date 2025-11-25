import React from "react";
import './style404.css';
import not from '../assets/404.png';

export default function NotFound(){
    return(
        <div id="ConteinerNotFound">            
            <div id='pageN'>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <img src={not} alt="404"/>
                <br/><br/>
                <a href="/">Voltar</a>
            </div>
        </div>
    );
};