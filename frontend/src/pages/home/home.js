import React from "react";
import './style_home.css';
import Logo from '../assets/Logo.png'

export default function Home(){
    return(
        <div id="HomeConteiner">
            <header id="HeaderHome">
                <img src={Logo} alt="Logo"/>
                <h1>Seu guia de beleza</h1>
            </header>
            <div id="ConteudoHome">
                <h2>Selecione o Salão.</h2>
                <ul>
                    <li>
                        <p className="PConteudohome">
                            Salão : Cabelereira leila°
                        </p>
                        <p className="PConteudohome">
                            Endereço : Raimundo n° 170 <br/>
                            CEP : 05514100
                        </p>
                        <button className="BtnConteudoHome">Ver agenda</button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p className="PConteudohome">
                            Salão : Cabelereira leila°
                        </p>
                        <p className="PConteudohome">
                            Endereço : Raimundo n° 170 <br/>
                            CEP : 05514100
                        </p>
                        <button className="BtnConteudoHome">Ver agenda</button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p className="PConteudohome">
                            Salão : Cabelereira leila°
                        </p>
                        <p className="PConteudohome">
                            Endereço : Raimundo n° 170 <br/>
                            CEP : 05514100
                        </p>
                        <button className="BtnConteudoHome">Ver agenda</button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p className="PConteudohome">
                            Salão : Cabelereira leila°
                        </p>
                        <p className="PConteudohome">
                            Endereço : Raimundo n° 170 <br/>
                            CEP : 05514100
                        </p>
                        <button className="BtnConteudoHome">Ver agenda</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
