import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";
import './style_ag_funcionario.css';

export default function AgendamentoFuncionario(){
    const History = useNavigate();
    const [ListaFuncionarios, setListaFuncionarios] = useState([]);
    useEffect(() =>{
        var cpf_salao = localStorage.getItem('cpf_salao');
        const Data = {
            cpf_salao
        };
        Api.post('/funcionarios', Data).then((Response) =>{
            setListaFuncionarios(Response.data);
            if(Response.data.length === 0){
                alert('funcionários não encontrados');
                History('/');
            };
        }).catch(() =>{
            alert('Erro ao buscar por funcionários.');
        });
        
    }, []);
    //url das imagens no servidor;
    const Url = "http://127.0.0.1:1998/image/";
    return(
        <div id="AgendamentoFuncionarioConteiner">
            <header id="HeaderAgFuncionario">
                <img src={Url + localStorage.getItem('logo_salao')} alt="Logo salão. "/>
                <p id="PHeaderNomeSalão">{localStorage.getItem('nome_salao')}</p>
            </header>
            <h1 id="H1AgFuncionario">
                Selecione um Profissiona
            </h1>
            <div id="ListFuncionarios"> 
                {ListaFuncionarios.map((iten, key) =>{
                    console.log(ListaFuncionarios)
                    const AgendaFuncionario = () => {
                        localStorage.setItem('idsalao', iten.cpf_salao);
                        localStorage.setItem('cpf_funcionario', iten.cpf_funcionario);
                        History('/agendafuncionario');
                    };
                    return(
                        <ul key={iten.id}>
                            <li>
                                <img src={Url + iten.foto_fincionario} alt="Logo salão. "/>
                                <p id="PListFuncionarios">
                                    {iten.nome_completo}
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