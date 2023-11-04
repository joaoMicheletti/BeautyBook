import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import './painelfuncionario.css';
import{FiLogOut} from 'react-icons/fi';
export default function PainelFuncionario(){
    const History = useNavigate();
    const DataAtual = new Date();// oibjeto data atual;
    //o servidor espera receber semaradamente o diam, mes e ano,
    var dia = parseInt(DataAtual.getDate(), 10);
    var mes = parseInt(DataAtual.getMonth(), 10) + 1;
    var ano = parseInt(DataAtual.getFullYear(), 10); 
    //pegando do storage o cpf do salão;
    var cpf_funcionario = localStorage.getItem('cpf_fincionario');
    const [Agendados, setAgendados] = useState([]);
    const Data = {
        dia, mes, ano, cpf_funcionario
    };
    
    useEffect( () =>{
        Api.post('/horariospreenchidos', Data).then((Response) =>{
            setAgendados(Response.data);
            
        }).catch((erro) =>{
            alert('Erro interno.');
        });
    }, []); //não passar dependências retorna um alerta ! porem ao passar o Data como dependência ele cai num loop infinito de requisições.
    function Exit(){
        localStorage.removeItem('cpf_salao');
        localStorage.removeItem('cpf_funcionario');
        alert('Até Breve');
        History('/');
        console.log('exit');
    };
    return(
        <div id='corpo'>
            <header className='cabeçalho'>
                <br/>
                <h5 id="TitleFuncionario" >Olá Colaborador.</h5>
                <button  onClick={Exit} id='Agenda' className="BtnExit" href="/painel"><FiLogOut/></button>
            </header>
            <br/>
            <h2>Agenda do Dia.</h2>
            <div className='ContainerAgenda'>
            {Agendados.map((iten, key) =>{
                //funções de cancelar e finalizar;
                //cancelar;
                const Cancelar = async (e) =>{
                    var id = iten.id;
                    var Data = {
                        id
                    };                            
                    await Api.put('/cancelarservico', Data).then((Response) =>{
                        alert(Response.data);
                        window.location.reload(true);
                    }).catch(() =>{
                        alert('Erro interno.')
                    });
                    };
                    //finalizar;
                    const Finalizar = async (e) =>{
                        var id = iten.id;
                        var Data = {
                            id
                        };                            
                        await Api.put('/finalizarservico', Data).then((Response) =>{
                            alert(Response.data);
                            window.location.reload(true);
                        }).catch(() =>{
                            alert('Erro interno.')
                        });
                    };
                    return(
                        <ul key={iten.id}>
                            <li>
                            <p className="UnderLine" >{iten.dia}/{iten.mes}/{iten.ano}</p>
                            <br/>
                            <p>Horário : {iten.hora}  AS {iten.hora_termino}</p>
                            <p>Cliente :  {iten.nome_cliente}</p>
                            <p>WhatsApp Cliente : </p> 
                            <a target="_blank"
                            rel='noreferrer'  
                            href='https://api.whatsapp.com/send?phone=5511932223533&text=Ol%C3%A1,%20Passando%20para%20lembrar-lhe%20que%20hoje%20voc%C3%AA%20tem%20um%20Hor%C3%A1rio%20marcado%20conosco.%20Posso%20Confirmar?' 
                            className="LKWhatsapp">{iten.contato_cliente}</a>
                            <br/>
                            <br/>
                            <p> Funcionário : {iten.nome_completo}</p>
                            <p>Serviços :  {iten.servico}</p>
                            <p>Observação : {iten.obs}
                            </p>
                            <br/>
                            <p className="UnderLine">Valro Serviço : {iten.preco} _R$</p><br/>
                            <div className="DivStatus">
                                <button className="BtnStatus" onClick={Cancelar}>Cancelar</button>
                                <br/><button className="BtnStatus" onClick={Finalizar}>finalizado</button>
                            </div>
                            </li>
                        </ul>
                        );                      
                    })}
            </div>
        </div>
    );
};