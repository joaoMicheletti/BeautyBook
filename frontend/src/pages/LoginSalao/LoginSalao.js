import React, { useState } from "react";
import "./style_login.css";
import Api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logoprovisor.webp";

export default function LoginSalao() {
  const Hystory = useNavigate();
  const [cpf_salao, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const Logar = async (e) => {
    e.preventDefault();
    const Data = { cpf_salao, senha };

    if (cpf_salao.length === 0) {
      alert("Preencha o campo Cpf");
    } else if (cpf_salao.length !== 11) {
      alert("Cpf ou Senha invalido");
    } else if (senha.length === 0) {
      alert("Preencha o campo Senha");
    } else {
      await Api.post("/loginsalao", Data)
        .then((Response) => {
          if (Response.data.res === "Salão ou funcionário não encontrado!") {
            alert(Response.data.res);
          } else if (Response.data.res === "Erro no login") {
            Hystory("/loginsalao");
            alert("Usuário ou senha invalidos.");
          } else if (
            Response.data.res ===
            "Acesso Negado, problemas com à assinatura do plano."
          ) {
            alert(Response.data.res);
          } else if (Response.data.res === "Dias Free excedidos") {
            alert(
              "Seus dias Livres de acesso a plataforma acabarm, para continuar seus trabalhos contrate um plano."
            );
            localStorage.setItem("cpf_salao", cpf_salao);
            Hystory("/planos");
          } else {
            var data = Response;

            if (data.data.cpf_funcionario === undefined) {
              if (data.statusPagamento === "pending") {
                alert(
                  "Seu pagamento ainda encontra-se pendente, certifique-se de que ele foi efetuado."
                );
                Hystory("/");
              } else if (data.statusPagamento === "approved") {
                alert("Seu pagamento foi aprovado!");
                localStorage.setItem("cpf_salao", cpf_salao);
                Hystory("/painel");
              } else if (data.statusPagamento === "") {
                alert("O pagamento do seu plano foi recusado.");
              } else if (data.assinatura_status === "on") {
                localStorage.setItem("cpf_salao", cpf_salao);
                alert("Logado com sucesso!");
                Hystory("/painel");
              } else {
                localStorage.setItem("cpf_salao", cpf_salao);
                Hystory("/painel");
              }
            } else {
              localStorage.setItem(
                "cpf_funcionario",
                data.data.cpf_funcionario
              );
              alert("logado com sucesso");
              Hystory("/painelfuncionario");
            }
          }
        })
        .catch(() => {
          alert("Erro interno.");
        });
    }
  };

  return (
    <div id="LoginSalao">
      <header className="header">
        <img className="logoTemp" src={Logo} alt="teste de logotipo" />
        <nav className="menu">
          <Link className="LK" to="/">Home</Link>
          <Link className="LK" to="/init">Parceiros</Link>
          <Link className="LK" to="/registrosalao">Registrar-se</Link>
          <Link className="LK" to="/loginsalao">Login</Link>
        </nav>
      </header>

      <div id="FormLoginSalao">
        <form id="Form_Login" onSubmit={Logar}>
          <h1>Login</h1>

          <label id="PLoginSalao">Usuário</label>
          <input
            className="InpLoginSalao"
            type="number"
            placeholder="Digite seu CPF"
            onChange={(e) => setCpf(e.target.value)}
          />

          <label id="PLoginSalao">Senha</label>
          <input
            className="InpLoginSalao"
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />

          <button id="BtnLoginSalao" type="submit">Login</button>

          <a className="a_login" href="/registrosalao">
            Não possui uma conta? Clique aqui
          </a>
        </form>
      </div>
    </div>
  );
}
