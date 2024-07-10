import React, {useState} from "react";
import './style.css';
import Api from '../../services/api';
import {useNavigate} from 'react-router-dom'

export default function RegistroSalao(){
    const [cpf_salao, setCpf] = useState('');
    const [nome_salao, setNome_salao] = useState('');
    const [endereco, setEndereco_Salao] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [Csenha, setCsenha] = useState('');
    const [indicado_por, setCodigo] = useState('');
    const DataAtual = new Date();
    var mes = DataAtual.getMonth() + 1;
    var data_cadastro = DataAtual.getDate() + '/' + mes + '/' + DataAtual.getFullYear();
    const Hystori = useNavigate();

    const Registrar = async (e) =>{
        e.preventDefault();
        if(cpf_salao.length === 0){
            alert("Preencha o Campo *CPF");
        } else if( cpf_salao.length > 11) {
            alert("Cpf Invalido!.");
        } else if(cpf_salao.length < 11) {
            alert("Cpf Invalido!.");
        } else {
            if(nome_salao.length === 0){
                alert("Preencha o Campo Nome Do Salão");
            } else if(endereco.length === 0){
                alert("Preencha o campo Endereço");
            } else if(cep.length === 0){
                alert('preencha o campo *CEP');
            } else if(cep.length < 8 | cep.length > 8){
                alert('Erro : @CEP invalido!!!');
            } else if(email.length === 0){
                alert("Preencha o campo E-mail");
            } else {
                if(senha.length === 0) {
                    alert("`Preencha o campo Senha.");
                } else if(Csenha.length === 0) {
                    alert("Preencha o campo Confirmar Senha.");
                } else if(senha === Csenha){
                    const Data = {
                        cpf_salao,
                        nome_salao,
                        endereco,
                        cep,
                        email,
                        senha,
                        Csenha,
                        indicado_por,
                        data_cadastro
                    };
                    console.log('oi')
                    await Api.post('/registrarsalao', Data)
                    .then((response) => {
                        console.log('Response:', response); // Log da resposta completa
                        console.log('Response data:', response.data); // Log dos dados da resposta

                        if (response.data === 'cadastrado com sucesso!') {
                        alert(response.data);
                        Hystori('/loginsalao');
                        } else if(response.data === 'salão já cadastrado'){
                            alert('salão já cadastrado');
                        } else if (response.data === 'Erro ao Cadastrar Salão.') {
                            alert('Erro ao Cadastrar Salão');
                        } else if (response.data === 'Erro interno') {
                            alert(response.data);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error); // Log do erro completo
                        alert('Erro interno!');
                    });
                } else {
                    alert("As Senhas não Corresponden!");
                };
            };
        };
        
        
    };
    return(
        <div id="RegistroSalao">
            <header id="HeaderRegistroSalao">
                <h4>HiddenBeauty</h4>
                <ul>
                    <a id="Link_reg" href="/">Home</a>
                    <a id="Link_reg" href="/loginsalao">Login</a>
                </ul>
                
            </header>
            <h1 id="registerTitulo">Registrar-se</h1>
            <div id="FomrRegistroSalao">
                <form onSubmit={Registrar}>
                    <div id='um'>
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
                        <p id="PRegistroSalao">
                            Endereço Salão
                        </p>
                        <input
                        className="InpRegistroSalao" 
                        type="text"
                        placeholder="Endereço Salão"
                        onChange={(e) => setEndereco_Salao(e.target.value)}/>
                        <p id="PRegistroSalao">
                            CEP
                        </p>
                        <input
                        className="InpRegistroSalao" 
                        type="number"
                        placeholder="Endereço Salão"
                        onChange={(e) => setCep(e.target.value)}/>
                    </div>
                    <div id="dois">
                        <p id="PRegistroSalao" >
                            E-mail
                        </p>
                        <input
                        className="InpRegistroSalao" 
                        type="email"
                        placeholder="janaina.salao@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}/>
                        <p id="PRegistroSalao">
                        Código de indicação 
                        </p> 
                        <input
                        className="InpRegistroSalao"
                        type="text"
                        placeholder="Senha"
                        onChange={(e) => setCodigo(e.target.value)}/>
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
                        <br/>
                        <br/>
                        <a href="/loginsalao">já possuí uma conta? click aqui</a>
                        <br/>
                        <br/>
                    </div>                
                </form>
            </div>
        </div>
    );
};