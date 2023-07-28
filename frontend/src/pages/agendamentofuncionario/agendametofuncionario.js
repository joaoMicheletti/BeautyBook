import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";
import './style_ag_funcionario.css';
import Logo from '../assets/Logo.png';

export default function AgendamentoFuncionario(){
    const History = useNavigate();
    const [ListaFuncionarios, setListaFuncionarios] = useState([]);
    useEffect(() =>{
        var cpf_salao = localStorage.getItem('cpf_salao');
        const Data = {
            cpf_salao
        };
        console.log(Data);
        Api.post('/funcionarios', Data).then((Response) =>{
            console.log(Response)
            setListaFuncionarios(Response.data);
            if(Response.data.length === 0){
                alert('funcionários não encontrados');
            };
        }).catch(() =>{
            alert('Erro ao buscar por funcionários.');
        });
        
    }, []);
    return(
        <div id="AgendamentoFuncionarioConteiner">
            <header id="HeaderAgFuncionario">
                <img src={Logo} alt="Logo salão. "/>
                <p id="PHeaderNomeSalão">Nome salão</p>
            </header>
            <h1 id="H1AgFuncionario">
                Agende com um de nossos Profissionais
            </h1>
            <div id="ListFuncionarios">
                {ListaFuncionarios.map((iten, key) =>{
                    const AgendaFuncionario = () => {
                        localStorage.setItem('cpf_funcionario', iten.cpf_funcionario);
                        History('/agendamento');
                    };
                    return(
                        <ul key={iten.id}>
                            <li>
                                <p id="PListFuncionarios">
                                    Agendar Com : {iten.nome_completo}
                                </p>
                                <button className="BtnListFuncionarios"
                                onClick={AgendaFuncionario}>Selecionar</button>
                            </li>
                        </ul>
                    );
                })}
                
            </div>
        </div>
    );
};