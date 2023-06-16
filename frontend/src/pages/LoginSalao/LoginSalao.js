import React, {useState} from "react";
import Logo from '../assets/Logo.png';
import './style.css';

export default function LoginSalao(){
    const [Cpf,  setCpf] = useState('');
    const [Senha, setSenha] = useState('');

    
    const Logar = async (e) => {
        e.preventDefault();
        const Data = {
            Cpf,
            Senha
        };
        console.log(Data);
        if(Cpf.length === 0){
            alert('Preencha o campo Cpf');
        }else if(Cpf.length > 11) {
            alert('Cpf ou Senha invalido');
        } else if(Cpf.length < 11){
            alert('Cpf ou Senha invalido');
        } else if(Senha.length === 0){
            alert('Preencha o campo Senha');
        } else {
            alert('enviar para a api');
        };
    }
    return(
        <div id="LoginSalao">
            <header id="HeaderLoginSalao">
                <img id="LogoImg" src={Logo} alt="logo"/>
            </header>
            <div id="FormLoginSalao">
                <h1>Login.</h1>
                <form onSubmit={Logar}>
                    <p id="PLoginSalao">
                        CPF
                    </p>
                    <input
                    className="InpLoginSalao"
                    type="number"
                    placeholder="____CPF"
                    onChange={(e) => setCpf(e.target.value)}/>

                    <p id="PLoginSalao">
                        Senha
                    </p>
                    <input
                    className="InpLoginSalao"
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setSenha(e.target.value)}/>
                    <br/>
                    <input
                    id="BtnLoginSalao"
                    type="submit"
                    value='Login'/>
                </form>
                <br/>
                <a href="/registrosalao">Nao possuí uma conta? click aqui</a>
            </div>
        </div>
    );
};