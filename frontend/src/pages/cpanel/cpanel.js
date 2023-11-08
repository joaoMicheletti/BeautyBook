import React, {useState} from "react";
import Logo from '../assets/Logo.png';
import './styleCpanel.css';
import Api from '../../services/api';

export default function Cpanel(){
    const [infoSalao, setInfoSalao] = useState("");
    async function BuscarSalao(){
        const Data = {
            cpf_salao: document.querySelector(".cpf_salao").value
        }
        console.log(Data);
        await Api.post('/buscarsalao', Data).then((Response) =>{
            if(Response.data.length === 0){
                alert('Não encontramos salão com esse "cpf"');
            } else {
                setInfoSalao(Response.data[0]);
            };
        }).catch((Erro) => {alert('Erro na solicitação.')});
        console.log(infoSalao)
        document.querySelector('#id').innerHTML = infoSalao.id;
        document.querySelector('#name').innerHTML = infoSalao.nome_salao;
        document.querySelector('#cpf').innerHTML = infoSalao.cpf_salao;
        document.querySelector('#endereco').innerHTML = infoSalao.endereco;
        document.querySelector('#cep').innerHTML = infoSalao.cep;
        document.querySelector('#email').innerHTML = infoSalao.email;
        document.querySelector('#senha').innerHTML = infoSalao.senha;
        document.querySelector('#plano').innerHTML = infoSalao.plano;
        document.querySelector('#assinatura').innerHTML = infoSalao.assinatura;
        document.querySelector('#assinatura_status').innerHTML = infoSalao.assinatura_status;
        document.querySelector('#data_inicio_plano').innerHTML = infoSalao.data_inicio_plano;
        document.querySelector('#data_vencimento_plano').innerHTML = infoSalao.data_vencimento_plano;
        document.querySelector('#limite_funcionarios').innerHTML = infoSalao.limite_funcionarios;
        document.querySelector('#quantidade_funcionarios').innerHTML = infoSalao.quantidade_funcionarios;

    };
    return(
        <div id="CpanelContainer">
            <header id="CpanelHeader">
                <img id="LogoImg" src={Logo} alt="logo"/>
                <nav id="Menu">
                    <a>Log Out</a>
                </nav>
            </header>
            <h1 id="CpanelTitle" >Painel de Suporte</h1>
            <div id="ConteudoContainer">
                <label>Cpf Do salão:<br/>
                    <input type="text" className="cpf_salao" id="inp" placeholder="Cpf Salão:"/>
                    <button onClick={BuscarSalao} id="btnBuscar">Buscar</button>
                </label><br/>
                <label>
                    Registro do salão.
                    <div id="infoSalao">
                        <br/>
                        <label>Número de Registro id: <p id="id"></p></label><br/>
                        <label>Nome Salão: <p id="name"> </p></label><br/>
                        <label>Cpf Salão:<p id="cpf"></p></label><br/>
                        <label>Endereço: <p id="endereco"></p></label><br/>
                        <label>CEP: <p id="cep"></p></label><br/>
                        <label>E-mail:<p id="email"></p></label><br/>
                        <label>Senha<p id="senha"></p></label><br/>
                        <label>Plano:<p id="plano"></p></label><br/>
                        <label>assinatura: <p id="assinatura"></p></label><br/>
                        <label>assinatura_status: <p id="assinatura_status"></p></label><br/>
                        <label>data_inicio_plano: <p id="data_inicio_plano"></p></label><br/>
                        <label>data_vencimento_plano: <p id="data_vencimento_plano"></p></label><br/>
                        <label>limite_funcionarios: <p id="limite_funcionarios"></p></label><br/>
                        <label>quantidade_funcionarios: <p id="quantidade_funcionarios"></p></label><br/>
                    </div>
                </label>
            </div>
        </div>
    );
}