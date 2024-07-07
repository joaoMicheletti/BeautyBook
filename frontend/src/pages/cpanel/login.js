import React from 'react';
import {useNavigate} from 'react-router-dom'
import Logo from '../assets/Logo.jpeg';
import './login.css';
import Api from '../../services/api';
export default function LoginCpanel(){
    const History = useNavigate();
    async function Entrar(){
        const Data = {
            user: document.querySelector('.user').value,
            pass: document.querySelector('.pass').value,
        };
        if(Data.user === ''){
            alert("Preencha o campo USER");
        } else if (Data.pass === ''){
            alert("Preencha o campo pass");
        } else {
            Api.post('/cpanellogin', Data).then((Response) => {
                if (Response.data === 'Erro no login'){
                    alert('Erro no login');
                } else{
                    localStorage.setItem('user', Response.data.user);
                    localStorage.setItem('pass', Response.data.pass);
                    //redirect;
                    History('/cpanel');
                }
            }).catch((Erro) => {
                alert('Erro na conexão com o servidor');
            });
        };
    };
    return(
        <div id='LoginCpanel'>
            <header id='HeaderCpanel'>
                <img src={Logo} alt='logos' />
            </header>
            <div id='ConteudoCpanelLogin'>
                <div id='FormLoginCpanel'>
                    <p>Login</p>
                    <label>User:  
                        <input id='InoCpanel' className='user' type='text' placeholder=' User'/>
                    </label>
                    <br/>
                    <label>Pass:  
                        <input id='InoCpanel' className='pass' type='password' placeholder=' User'/>
                    </label>
                    <br/>
                    <input onClick={Entrar} type='submit' value="Entrar"/>
                </div>
            </div>
        </div>
    );
};