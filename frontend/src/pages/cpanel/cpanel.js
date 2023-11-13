import React, {useState} from "react";
import Logo from '../assets/Logo.png';
import './styleCpanel.css';
import Api from '../../services/api';

export default function Cpanel(){
    const [infoSalao, setInfoSalao] = useState("");
    //buscar salão;
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
    }
    //funcionalidades;
    let [funcionalidade, setFuncionalidade] = useState('');
    function Executar(){
        if (funcionalidade === 'funcionalidades'|| funcionalidade === ''){
            alert('Selecione uma funcionalidade');
            //editar senha;
        } else if (funcionalidade === 'editar senha'){
            var cpf = document.querySelector('#cpf').value;
            var senha  = document.querySelector('#Alteracao').value;
            if(cpf === '' || cpf === undefined){
                alert('Nenhun salão selecionado.');
            } else if(senha === ''){
                alert('Preencaha o campo Alteração.')
            } else {
                const Data = {funcionalidade, senha}
                console.log(Data);
                /*
                Api.post('', Data).then((Response) => {}).catch((erro) =>{
                    alert('Erro ao comunicar-se com o servidor');
                });*/
            };            
            //editar plano;
        } else if (funcionalidade === 'editar plano'){
            var plano  = document.querySelector('#Alteracao').value;
            var cpf = document.querySelector('#cpf').value;
            if(cpf === '' || cpf === undefined){
                alert('Nenhun salão selecionado.');
            } else if(plano === ''){
                alert('Preencaha o campo Alteração.')
            } else {
                const Data = {funcionalidade, plano}
                console.log(Data);
                /*
                Api.post('', Data).then((Response) => {}).catch((erro) =>{
                    alert('Erro ao comunicar-se com o servidor');
                });*/
            };             
            //editar assinatura;
        } else if (funcionalidade === 'editar assinatura'){
            var assinatura  = document.querySelector('#Alteracao').value;
            var cpf = document.querySelector('#cpf').value;
            if(cpf === '' || cpf === undefined){
                alert('Nenhun salão selecionado.');
            } else if(assinatura === ''){
                alert('Preencaha o campo Alteração.')
            } else {
                const Data = {funcionalidade, assinatura}
                console.log(Data);
                /*
                Api.post('', Data).then((Response) => {}).catch((erro) =>{
                    alert('Erro ao comunicar-se com o servidor');
                });*/
            }; 
            //editar assinatura status;
        }else if (funcionalidade === 'editar assinatura status'){
            var assinatura_status  = document.querySelector('#Alteracao').value;
            var cpf = document.querySelector('#cpf').value;
            if(cpf === '' || cpf === undefined){
                alert('Nenhun salão selecionado.');
            } else if(assinatura_status === ''){
                alert('Preencaha o campo Alteração.')
            } else {
                const Data = {funcionalidade, assinatura_status}
                console.log(Data);
                /*
                Api.post('', Data).then((Response) => {}).catch((erro) =>{
                    alert('Erro ao comunicar-se com o servidor');
                });*/
            }; 
            // editar inicio de plano;
        }else if (funcionalidade === 'editar inicio de plano'){
            var data_inicio_plano  = document.querySelector('#Alteracao').value;
            var cpf = document.querySelector('#cpf').value;
            if(cpf === '' || cpf === undefined){
                alert('Nenhun salão selecionado.');
            } else if(data_inicio_plano === ''){
                alert('Preencaha o campo Alteração.')
            } else {
                const Data = {funcionalidade, data_inicio_plano}
                console.log(Data);
                /*
                Api.post('', Data).then((Response) => {}).catch((erro) =>{
                    alert('Erro ao comunicar-se com o servidor');
                });*/
            }; 
            // editar vencimento de plano
        }else if (funcionalidade === 'editar vencimento de plano'){
            var data_vencimento_plano  = document.querySelector('#Alteracao').value;
            var cpf = document.querySelector('#cpf').value;
            if(cpf === '' || cpf === undefined){
                alert('Nenhun salão selecionado.');
            }else if(data_vencimento_plano === ''){
                alert('Preencaha o campo Alteração.')
            } else {
                const Data = {funcionalidade, data_vencimento_plano}
                console.log(Data);
                /*
                Api.post('', Data).then((Response) => {}).catch((erro) =>{
                    alert('Erro ao comunicar-se com o servidor');
                });*/
            }; 
        }else if (funcionalidade === 'editar limite de funcionarios'){
            var limite_funcionarios  = document.querySelector('#Alteracao').value;
            var cpf = document.querySelector('#cpf').value;
            if(cpf === '' || cpf === undefined){
                alert('Nenhun salão selecionado.');
            } else if(limite_funcionarios === ''){
                alert('Preencaha o campo Alteração.')
            } else {
                const Data = {funcionalidade, limite_funcionarios}
                console.log(Data);
                /*
                Api.post('', Data).then((Response) => {}).catch((erro) =>{
                    alert('Erro ao comunicar-se com o servidor');
                });*/
            }; 
        }
    };
    return(
        <div id="CpanelContainer">
            <header id="CpanelHeader">
                <img id="LogoImg" src={Logo} alt="logo"/>
                <nav id="Menu">
                    <a>Log-Out</a>
                </nav>
            </header>
            <h1 id="CpanelTitle" >Painel de Suporte</h1>
            <div id="ConteudoContainer">
                <label>Cpf Do salão:<br/>
                    <input type="text" className="cpf_salao" id="inp" placeholder=" Cpf Salão:"/>
                    <button onClick={BuscarSalao} id="btnBuscar">Buscar</button>
                </label><br/>
                <div>
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
                </div>
            </div>
            <div id="UpdateArea">
                <p>Área de Ajustes</p>
                <br/>
                <p>***###   Lenbrese de informar os valores da forma correta   ###***</p>
                <br/>
                <label>
                    Selecionar função:
                    <select onChange={(e) => setFuncionalidade(e.target.value)} name="dia" id="dia">
                        <option value="funcionalidades">funcionalidades</option>
                        <option value="editar senha">editar senha</option>
                        <option value="editar plano">editar plano</option>
                        <option value="editar assinatura">editar assinatura</option>
                        <option value="editar assinatura status">editar assinatura status</option>
                        <option value="editar inicio de plano">editar inicio de plano</option>
                        <option value="editar vencimento de plano">editar vencimento de plano</option>
                        <option value="editar limite de funcionarios">editar limite de funcionarios</option>
                        </select>
                </label>
                <br/>
                <div id="Value">
                    <label>Alteração:
                        <input id="Alteracao" type="text" placeholder="  ALTERAÇÃO"/>
                    </label>
                    <button onClick={Executar} id="BtnExecutar">Executar</button>
                </div>
                <br/>
                <br/>   
            </div>
        </div>
    );
}