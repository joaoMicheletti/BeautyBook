import React, {useState} from 'react';
import './style_planos.css';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Planos(){
    const [quantidade, setquantidade] = useState('');
    const Hystory  = useNavigate();
    const Individual = () => {
        const Data = {
            plano : 'plano individual',
            quantidade : 1,
        };
        console.log(Data)
        //rota para criar o id de preference
        console.log(Data);
        Api.post('/preferenceid',Data).then((Response) => {
            console.log(Response.data)
            localStorage.setItem('preferenceID', Response.data.id);
            Hystory('/pagamento');
        }).catch((erro) =>{
            alert('falha na comunicação com o servidor...');
        });
    };
    const Personalizado = () => {
        if(quantidade === '' ){
            alert('Defina a quantidade de funcionários');
        } else {
            const Data = {
                x : quantidade,
                plano : "plano personalizado",
                quantidade: 1,
            };
            localStorage.setItem('quntidadee', quantidade);
            //rota para criar o id de preference 
            console.log(Data);
            Api.post('/preferenceid',Data).then((Response) => {
                localStorage.setItem('preferenceID', Response.data);
                Hystory('/pagamento');
            }).catch((erro) =>{
                alert('falha na comunicação com o servidor...');
            });
        };
    };
    return(
        <div id='ConteinerPlanos'>
            <header id='HeaderPlanos'>
                <h1>Hidden Beauty</h1>
                <ul>
                    <a id="Link_AF" href="/">Voltar</a>
                </ul>                
            </header>
            
            <div id='Planos'>
                <p id='PPlanos'>Conheça nossos Planos</p>
                <br/>
                <ul>
                    <li >
                        <p className='TitlePlano'>
                            Individual
                        </p>
                        <p>50,00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Relatório Diário</p>
                        <p>*Serviços Finalizados</p>
                        <p>Serviços Cancelados</p>
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
                        <p>{quantidade * 50},00 R$ / Mes</p>
                        <p>Suporte 24 H / Dia</p>
                        <p>Relatório Diário</p>
                        <p>-Serviços Finalizados</p>
                        <p>-Serviços Cancelados</p>
                        <p>-Relatŕio de entrada de CAixa</p>
                        <p>***Exceto Para os Funcionários</p>
                        <button className='BtnIndividual'
                        onClick={Personalizado}>Selecionar</button>
                    </li>
                </ul>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
};