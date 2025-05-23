import React, {useState} from "react";
import './style_login.css';
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
            await Api.post('/loginsalao', Data).then((Response) => {
                console.log(Response, '<<<<');
                if(Response.data.res === 'Salão ou funcionário não encontrado!'){
                    alert(Response.data.res);
                } else if(Response.data.res === 'Erro no login'){
                    Hystory("/loginsalao");
                    alert("Usuário ou senha invalidos.");
                } else if(Response.data.res === 'Acesso Negado, problemas com à assinatura do plano.'){
                    alert(Response.data.res);                
                } else if(Response.data.res === "Dias Free excedidos"){
                    alert('Seus dias Livres de acesso a plataforma acabarm, para continuar eus trabalhos contrate um plano.');
                    localStorage.setItem('cpf_salao', cpf_salao);
                    Hystory("/planos");
                } else{
                    console.log("aqui modeuzi")
                    //logado com sucessu;
                    //salvar no localstorage o cof_salão;
                    //salvando a resposta na variavel data;
                    var data = Response;
                    console.log(data.data.cpf_funcionario);
                    // si data.cpf_funcionario === undefined; logado como salão 
                    if(data.data.cpf_funcionario === undefined){
                        if(data.statusPagamento === 'pending'){
                            alert('Seu pagamento ainda encontra-se pendente, certifique-se de que ele foi efetuado.');
                            Hystory('/');
                        } else if(data.statusPagamento === 'approved'){
                            alert('Seu pagamento foi aprovado, é  bom ter você de volta!');
                            localStorage.setItem('cpf_salao', cpf_salao);
                            Hystory('/painel'); 
                        } else if(data.statusPagamento === ''){
                            alert('O pagamento do seu plano foi recusado.');
                        }else if(data.assinatura_status === "on"){
                            localStorage.setItem('cpf_salao', cpf_salao)
                            alert('Logado com sucesso!');
                            Hystory('/painel');
                        } else {
                            // se passou por essas etapas o salão ainda esta com os dias free liberados;
                            localStorage.setItem('cpf_salao', cpf_salao);
                            console.log(data);
                            Hystory('/painel');
                        }
                    } else {
                        //logado como funcionário;
                        //encaminar para painel do funcionário;
                        localStorage.setItem('cpf_funcionario', data.data.cpf_funcionario);
                        alert("logado com sucesso");
                        Hystory('/painelfuncionario');
                    };
                }
            }).catch((Erro) => {
                alert('Erro internoo.');
            });
        };
    };
    return(
        <div id="LoginSalao">
            <header id="HeaderLoginSalao">
                <h4>Flowly</h4>
                <ul>
                    <a id="Link" href="/">Home</a>
                    <a id="Link" href="/registrosalao">Registrar-se</a> 
                </ul>
                
            </header>
            <div id="FormLoginSalao">
                
                <form id="Form_Login" onSubmit={Logar}>
                    <h1>Login</h1>
                    <p id="PLoginSalao">
                        Usuário
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
                    <a href="/registrosalao">Não possuí uma conta? click aqui</a><br/>
                </form>
                <br/>
            </div>
        </div>
    );
};
