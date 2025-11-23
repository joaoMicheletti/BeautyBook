import React, { useState } from "react";
import "./style.css";
import Api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logoprovisor.webp";

export default function RegistroSalao() {
  const [cpf_salao, setCpf] = useState("");
  const [nome_salao, setNome_salao] = useState("");
  const [endereco, setEndereco_Salao] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [Csenha, setCsenha] = useState("");
  const [indicado_por, setCodigo] = useState("");

  const DataAtual = new Date();
  const mes = DataAtual.getMonth() + 1;
  const data_cadastro =
    DataAtual.getDate() + "/" + mes + "/" + DataAtual.getFullYear();

  const Hystori = useNavigate();

  const Registrar = async (e) => {
    e.preventDefault();

    if (cpf_salao.length === 0) {
      alert("Preencha o Campo *CPF");
    } else if (cpf_salao.length !== 11) {
      alert("Cpf Invalido!.");
    } else {
      if (nome_salao.length === 0) {
        alert("Preencha o Campo Nome Do Salão");
      } else if (endereco.length === 0) {
        alert("Preencha o campo Endereço");
      } else if (cep.length === 0) {
        alert("Preencha o campo *CEP");
      } else if (cep.length !== 8) {
        alert("Erro : @CEP invalido!!!");
      } else if (email.length === 0) {
        alert("Preencha o campo E-mail");
      } else {
        if (senha.length === 0) {
          alert("Preencha o campo Senha.");
        } else if (Csenha.length === 0) {
          alert("Preencha o campo Confirmar Senha.");
        } else if (senha === Csenha) {
          const Data = {
            cpf_salao,
            nome_salao,
            endereco,
            cep,
            email,
            senha,
            Csenha,
            indicado_por,
            data_cadastro,
          };

          await Api.post("/registrarsalao", Data)
            .then((response) => {
              if (response.data === "cadastrado com sucesso!") {
                alert(response.data);
                Hystori("/loginsalao");
              } else if (response.data === "salão já cadastrado") {
                alert("salão já cadastrado");
              } else if (response.data === "Erro ao Cadastrar Salão.") {
                alert("Erro ao Cadastrar Salão");
              } else if (response.data === "Erro interno") {
                alert(response.data);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Erro interno!");
            });
        } else {
          alert("As Senhas não Corresponden!");
        }
      }
    }
  };

  return (
    <div id="RegistroSalao">
      <header className="header">
        <img className="logoTemp" src={Logo} alt="Logo" />

        <nav className="menu">
          <Link className="LK" to="/">Home</Link>
          <Link className="LK" to="/init">Parceiros</Link>
          <Link className="LK" to="/registrosalao">Registrar-se</Link>
          <Link className="LK" to="/loginsalao">Login</Link>
        </nav>
      </header>

      <h1 id="registerTitulo">Registrar-se</h1>

      <div id="FomrRegistroSalao">
        <form onSubmit={Registrar}>
          <div className="col">
            <label>CPF</label>
            <input
              className="InpRegistroSalao"
              type="number"
              placeholder="CPF"
              onChange={(e) => setCpf(e.target.value)}
            />

            <label>Razão Social</label>
            <input
              className="InpRegistroSalao"
              type="text"
              placeholder="Nome do Salão"
              onChange={(e) => setNome_salao(e.target.value)}
            />

            <label>Endereço</label>
            <input
              className="InpRegistroSalao"
              type="text"
              placeholder="Endereço"
              onChange={(e) => setEndereco_Salao(e.target.value)}
            />

            <label>CEP</label>
            <input
              className="InpRegistroSalao"
              type="number"
              placeholder="CEP"
              onChange={(e) => setCep(e.target.value)}
            />
          </div>

          <div className="col">
            <label>E-mail</label>
            <input
              className="InpRegistroSalao"
              type="email"
              placeholder="email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Código de Indicação</label>
            <input
              className="InpRegistroSalao"
              type="text"
              placeholder="Código"
              onChange={(e) => setCodigo(e.target.value)}
            />

            <label>Senha</label>
            <input
              className="InpRegistroSalao"
              type="password"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />

            <label>Confirmar Senha</label>
            <input
              className="InpRegistroSalao"
              type="password"
              placeholder="Confirmar Senha"
              onChange={(e) => setCsenha(e.target.value)}
            />

            <button id="BtnRegistroSalao" type="submit">Registrar-se</button>

            <a id="AC" href="/loginsalao">
              Já possui conta? Clique aqui
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
