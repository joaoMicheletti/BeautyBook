import React, {useState} from "react";
import Logo from '../assets/Logo.png';
import './style.css';

export default function RegistroSalao(){
    const [Cpf, setCpf] = useState('');
    const [Nome_salao, setNome_salao] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [Csenha, setCsenha] = useState('');

    const Registrar = async (e) =>{
        e.preventDefault();
        console.log(Cpf.length);
        if(Cpf.length === 0){
            alert("Preencha o Campo *CPF");
        } else if( Cpf.length > 11) {
            alert("Cpf Invalido!.");
        } else if(Cpf.length < 11) {
            alert("Cpf Invalido!.");
        } else {
            if(Nome_salao.length === 0){
                alert("Preencha o Campo Nome Do Salão");
            } else if(Email.length === 0){
                alert("Preencha o campo E-mail");
            } else {
                if(Senha.length === 0) {
                    alert("`Preencha o campo Senha.");
                } else if(Csenha.length === 0) {
                    alert("Preencha o campo Confirmar Senha.");
                } else if(Senha === Csenha){
                    alert("ok");
                } else {
                    alert("As Senhas não Corresponden!");
                }
            }
        }
        const Data = {
            Cpf,
            Nome_salao,
            Email,
            Senha,
            Csenha
        };

        console.log(Data);
    }
    return(
        <div id="RegistroSalao">
            <header id="HeaderRegistroSalao">
                <img src={Logo} alt="Logo"/>
            </header>
            <div id="FomrRegistroSalao">
                <form onSubmit={Registrar}>
                    <p id="PRegistroSalao">
                        CPF 
                    </p>
                    <input
                    className="InpRegistroSalao" 
                    type="number" 
                    placeholder="CPF "
                    onChange={(e) => setCpf(e.target.value)}/>

                    <p id="PRegistroSalao">
                        Nome Do Salão
                    </p>
                    <input
                    className="InpRegistroSalao" 
                    type="text"
                    placeholder="Nome Do Salão"
                    onChange={(e) => setNome_salao(e.target.value)}/>

                    <p id="PRegistroSalao" >
                        E-mail
                    </p>
                    <input
                    className="InpRegistroSalao" 
                    type="email"
                    placeholder="janaina.salao@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}/>

                    <p id="PRegistroSalao">
                        Senha
                    </p> 
                    <input
                    className="InpRegistroSalao"
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setSenha(e.target.value)}/>

                    <p id="PRegistroSalao">
                        Confirmar Senha
                    </p>
                    <input
                    className="InpRegistroSalao"
                    type="password"
                    placeholder="Confirmar Senha"
                    onChange={(e) => setCsenha(e.target.value)}/>

                    <br/>
                    <br/>
                    <input 
                    id="BtnRegistroSalao"
                    type="submit"
                    value='Registrar-se'
                    />
                </form>
            </div>
        </div>
    );
};