import React, {useState} from 'react';
import './style_planos.css';
import Logo from '../assets/Logo.png';

export default function Planos(){
    const [quantidade, setquantidade] = useState('');

    const Individual = () => {
        const Data = {
            plano : 'individual',
            preco : 30.00
        };
        console.log(Data);
    };

    const Personalizado = () => {
        if(quantidade === '' ){
            alert('Defina a quantidade de funcionários');
        } else {
            const Data = {
                plano : "personalizado",
                quantidade,
                preco: quantidade * 30
            };
           console.log(Data);
        };
    };


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
                <br/>
                <ul>
                    <li >
                        <p className='TitlePlano'>
                            Individual
                        </p>
                        <p>30,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <button className='BtnIndividual'
                        onClick={Individual}>Selecionar</button>

                    </li>
                    <li >
                        <p className='TitlePlano'>
                            Personalizado
                        </p>
                        <p>quantidade de funcionários</p>
                        <input type='number' 
                        id='InputQuantidade' 
                        placeholder='Quantidade de funcionários' 
                        onChange={(e) => setquantidade(e.target.value)}></input>
                        <p>{quantidade * 30},00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <button className='BtnIndividual'
                        onClick={Personalizado}>Selecionar</button>

                    </li>
                </ul>
            </div>
        </div>
    );
};