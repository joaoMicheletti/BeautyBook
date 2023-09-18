import React, {useState} from "react";
import Logo from '../assets/Logo.png';
import './style.css';
import Api from '../../services/api';
import {useNavigate} from 'react-router-dom';

export default function LoginSalao(){
    const Hystory = useNavigate();
    const [cpf_salao,  setCpf] = useState('');
    const [senha, setSenha] = useState('');

    
    const Logar = async (e) => {
        e.preventDefault();
        const Data = {
            cpf_salao,
            senha
        };

        if(cpf_salao.length === 0){
            alert('Preencha o campo Cpf');
        }else if(cpf_salao.length > 11) {
            alert('Cpf ou Senha invalido');
        } else if(cpf_salao.length < 11){
            alert('Cpf ou Senha invalido');
        } else if(senha.length === 0){
            alert('Preencha o campo Senha');
        } else {
        };
        await Api.post('/loginsalao', Data).then((Response) => {
            console.log(Response.data);
            if(Response.data === 'não encontramos nenhum salão ou funcionário com esses dados!'){
                alert(Response.data);
            } else if(Response.data === 'erro no login'){
                alert("Usuário ou senha invalidos.");
            } else if(Response.data === 'Acesso Negado, problemas com à assinatura do plano.'){
                alert(Response.data);                
            } else if(Response.data === "Dias Free exedidos"){
            	alert('Seus dias Livres de acesso a plataforma acabarm, para continuar eus trabalhos contrate um plano.');
                localStorage.setItem('cpf_salao', cpf_salao);
            	Hystory("/planos");
            } else{
                //logado com sucessu;
                //salvar no localstorage o cof_salão;
                //salvando a resposta na variavel data;
                var data = Response.data;
                // si data.cpf_funcionario === undefined; logado como salão 
                if(data.cpf_funcionario === undefined){
                    localStorage.setItem('cpf_salao', data.cpf_salao);
                    //encaminha para o painel;
                    alert("Logado com sucesso, Bom Trabalho.");
                    Hystory('/painel');                    
                } else {
                    //logado como funcionário;
                    //encaminar para painel do funcionário;
                    localStorage.setItem('cpf_funcionario', data.cpf_funcionario);
                };
            }
        }).catch((Erro) => {
            alert('Erro interno.');
        });
    };
    return(
        <div id="LoginSalao">
            <header id="HeaderLoginSalao">
                <img id="LogoImg" src={Logo} alt="logo"/>
            </header>
            <div id="FormLoginSalao">
                <h1>Login.</h1>
                <form onSubmit={Logar}>
                    <p id="PLoginSalao">
                        CPF salão / Funcionário
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
                <a href="/registrosalao">Não possuí uma conta? click aqui</a>
            </div>
        </div>
    );
};
