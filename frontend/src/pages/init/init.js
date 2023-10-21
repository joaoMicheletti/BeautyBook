import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import './style_init.css';
import Logo from '../assets/Logo.png'
import Api from '../../services/api';

export default function Init(){
    // por precaução caso o usuário selecione um salão e por alguma eventualidade volte para a pagina anterior
    // removeremos os dados que estarão armazenados no localstorage();
    localStorage.removeItem('cpf_salao');
    localStorage.removeItem('logo_salao');
    localStorage.removeItem('nome_salao');
    localStorage.removeItem('cpf_funcionario');
    localStorage.removeItem('idsalao');
    const History = useNavigate();
    const [ListaSalao, setListaSalao] = useState([]);
    
    useEffect(() =>{
        Api.get('/listarsalao').then((Response) =>{
            setListaSalao(Response.data);
        }).catch(() =>{
            alert('Erro ao carregar os salões.');
        })
    }, []);
    return(
        <div id="HomeConteinerInit">
            <header id="HeaderHomeInit">
                <img id='LogoInit'src={Logo} alt="Logo"/>
                <br/>
                <ul>
                    <li><a id="A" href="/">Home</a></li>
                    <li><a id="A" href="/loginsalao">Login_salão</a></li>
                    <li><a id="A" href="/registrosalao">Registrar_Salão</a></li>
                </ul>
            </header>
            <div id="ConteudoHomeInit">
                <h2 id="H">Selecione um Salão.</h2>
                {ListaSalao.map((iten, key) => {
                    const URL = 'http://127.0.0.1:1998/image/';
                    const Agenda = () =>{
                        console.log(iten.quantidade_funcionarios);
                        if(iten.quantidade_funcionarios === null){
                            localStorage.setItem('cpf_salao', iten.cpf_salao);
                            localStorage.setItem('logo_salao', iten.logo_salao);
                            localStorage.setItem('nome_salao', iten.nome_salao);
                            History('/agendamento');
                        } else if(iten.quantidade_funcionarios > 0){
                            localStorage.setItem('cpf_salao', iten.cpf_salao);
                            localStorage.setItem('logo_salao', iten.logo_salao);
                            localStorage.setItem('nome_salao', iten.nome_salao);
                            History('/agendamentofuncionario');
                        } else {
                            alert('Erro interno.');
                        }
                    }
                    return(
                        <ul key={iten.id}>
                            <img src={URL + iten.logo_salao} alt="logo"/>
                            <li>
                                <p className="PConteudohome">
                                    {iten.nome_salao}
                                </p>
                                <br/>
                                <label>Endereço :</label>
                                <p className="PConteudohome">
                                    {iten.endereco} <br/>
                                    <br/>
                                    CEP : {iten.cep}
                                </p>
                                <br/>
                                <button className="BtnConteudoHomeInit"
                                onClick={Agenda}>Selecionar</button>
                            </li>
                        </ul>
                    );
                })} 
            </div>
        </div>
    );
};
