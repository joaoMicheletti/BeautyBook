import React from 'react';
import './style_planos.css';
import Logo from '../assets/Logo.png';

export default function Planos(){
    return(
        <div id='ConteinerPlanos'>
            <header id='HeaderPlanos'>
                <img src={Logo} alt='logo BeautyBook'/>
                <p id='TitlePlanos'>
                    Conheça nossos Planos
                </p>
            </header>
            
            <div id='Planos'>
                <p id='PPlanos'>Planos</p>
                <br/>
                <ul>
                    <li >
                        <p className='TitlePlano'>
                            Individual
                        </p>
                        <p>03 Meses</p>
                        <p>30,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                    <li >
                        <p className='TitlePlano'>
                            Individual
                        </p>
                        <p>06 Meses</p>
                        <p> 25,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                    <li >
                        <p className='TitlePlano'>
                            Individual
                        </p>
                        <p>12 Meses</p>
                        <p> 20,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                </ul>
                <ul>
                    <li >
                        <p className='TitlePlano'>
                            1X
                        </p>
                        <p>03 Meses</p>
                        <p>60,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Agenda Individual para +1 Fincionário</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                    <li >
                        <p className='TitlePlano'>
                            1X
                        </p>
                        <p>06 Meses</p>
                        <p> 55,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Agenda Individual para +1 Fincionário</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                    <li >
                        <p className='TitlePlano'>
                            1X
                        </p>
                        <p>12 Meses</p>
                        <p> 50,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Agenda Individual para +1 Fincionário</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                </ul>
                <ul>
                    <li >
                        <p className='TitlePlano'>
                            4X
                        </p>
                        <p>03 Meses</p>
                        <p>150,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Agenda Individual para até 4 Fincionário</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                    <li >
                        <p className='TitlePlano'>
                            4X
                        </p>
                        <p>06 Meses</p>
                        <p> 145,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Agenda Individual para até 4 Fincionário</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                    <li >
                        <p className='TitlePlano'>
                            4X
                        </p>
                        <p>12 Meses</p>
                        <p> 140,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Agenda Individual para até Fincionário</p>
                        <button className='BtnIndividual'>Selecionar</button>

                    </li>
                </ul>
            </div>
        </div>
    );
};