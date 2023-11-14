import React from 'react';
import Logo from '../assets/Logo.png';
import './login.css';
export default function LoginCpanel(){
    return(
        <div id='LoginCpanel'>
            <header id='HeaderCpanel'>
                <img src={Logo}  />
            </header>
            <section id='ConteudoCpanelLogin'>
                <div id='FormLoginCpanel'>
                    <p>Login</p>
                    <label>User:  
                        <input id='InoCpanel' type='text' placeholder=' User'/>
                    </label>
                    <br/>
                    <label>Pass:  
                        <input id='InoCpanel' type='password' placeholder=' User'/>
                    </label>
                    <br/>
                    <button>Entrar</button>
                </div>
            </section>
        </div>
    );
};