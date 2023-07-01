import React from "react";
import './style_ag_funcionario.css';
import Logo from '../assets/Logo.png';

export default function AgendamentoFuncionario(){
    return(
        <div id="AgendamentoFuncionarioConteiner">
            <header id="HeaderAgFuncionario">
                <img src={Logo} alt="Logo salão. "/>
                <p id="PHeaderNomeSalão">Nome salão</p>
            </header>
            <h1 id="H1AgFuncionario">
                Agende com um de nossos Profissionais
            </h1>
            <div id="ListFuncionarios">
                <ul>
                    <li>
                        <p id="PListFuncionarios">
                            Agendar Com : João Micheletti
                        </p>
                        <button className="BtnListFuncionarios">Selecionar</button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p id="PListFuncionarios">
                            Agendar Com : João Micheletti
                        </p>
                        <button className="BtnListFuncionarios">Selecionar</button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p id="PListFuncionarios">
                            Agendar Com : João Micheletti
                        </p>
                        <button className="BtnListFuncionarios">Selecionar</button>
                    </li>
                </ul>

            </div>
        </div>
    );
};