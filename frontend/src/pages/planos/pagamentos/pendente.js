import React from "react";
//import { useNavigate, useParams } from "react-router-dom";
import Api from "../../../services/api";
import './style.css'
export default function Pendente(){
    const currentURL = window.location.href;
    // Remove o ponto de interrogação no início da URL, se presente
    const queryString = currentURL.includes('?') ? currentURL.split('?')[1] : currentURL;
    // Crie um objeto URLSearchParams a partir da string de consulta
    const params = new URLSearchParams(queryString);
    // Agora você pode acessar os parâmetros individualmente
    //todos os parametros que vem pela url;
    /*const collectionId = params.get('collection_id');
    const collectionStatus = params.get('collection_status');
    const status = params.get('status');
    const external_reference = params.get('external_reference');
    const payment_type = params.get('payment_type');
    const merchat_order_id = params.get('merchat_order_id');
    const preference_id = params.get('preference_id');
    const site_id = params.get('site_id');
    const processing_mode = params.get('processing_mode');
    const merchat_account_id = params.get('merchat_account_id');*/
    //buscar se opgamento foi realixado.
    const paymentId = params.get('payment_id'); //isso tem que ser pasado para consultar o pagamento;
    Api.post('/buscarpg', {paymentId}).then(async(Response) =>{
        console.log(Response.data);
        //pagamento pendente e via boleto;
        if(Response.data.status === 'pending' && Response.data.id === 'pix'){
            var salao = localStorage.getItem('cpf_salao');
            console.log(salao)
            console.log(salao);
            var Data = {
                salao, paymentId
            };
            //rota para salvar o pymentId no data base para tratamento futuro;
            Api.post('/pending', Data).then((Response) => {
                console.log(Response.data);
                if(Response.data === 1){
                    document.querySelector('#alerta').innerHTML = "Seu pagamento encontra-se pendente em nosso sistema, Você optou pelo pagamento VIA pix, espere pela aprovação.";
                } else {
                    alert('Ocorreu um erro inesperado, caso tenha efetuado o pagamento entre encontato como suport.');
                };
            }).catch((erro) =>{
                alert('Erro ao comunicar-se com o servidor.');
            });

        }else if(Response.data.status === 'pending' && Response.data.id === 'bolbradesco'){
            var salao = localStorage.getItem('cpf_salao');
            console.log(salao);
            var Data = {
                salao, paymentId
            };
            //rota para salvar o pymentId no data base para tratamento futuro;
            Api.post('/pending', Data).then((Response) => {
                console.log(Response.data);
                if(Response.data === 1){
                    document.querySelector('#alerta').innerHTML = "Seu pagamento encontra-se pendente em nosso sistema, Você optou pelo pagamento VIA BOLETO, após efetuar o pagamento espere de 1 a 2 dias UTEIS para aprovação.";
                } else {
                    alert('Ocorreu um erro inesperado, caso tenha efetuado o pagamento entre encontato como suport.');
                };
            }).catch((erro) =>{
                alert('Erro ao comunicar-se com o servidor.');
            });
        //pagamento pendente e via lotericas;
        } else if(Response.data.status === 'pending' && Response.data.id === 'pec'){
            var salao = localStorage.getItem('cpf_salao');
            console.log(salao);
            var Data = {
                salao, paymentId
            };
            //rota para salvar o pymentId no data base para tratamento futuro;
            Api.post('/pending', Data).then((Response) => {
                if(Response.data === 1){
                    document.querySelector('#alerta').innerHTML = "Seu pagamento encontra-se pendente em nosso sistema, Você optou pelo pagamento na loterica, após efetuar o pagamento é so fazer login em nosso sistema!";
                } else {
                    alert('Ocorreu um erro inesperado, caso tenha efetuado o pagamento entre encontato como suport.');
                };
            }).catch((erro) =>{
                alert('Erro ao comunicar-se com o servidor.');
            });
        }else if(Response.data.status === 'approved'){
            console.log('aproved');
            //criando objeto com a data atual;
            const dataAtual = new Date();
            //separando dia mes ano;
            var dia = dataAtual.getDate();
            var mes = dataAtual.getMonth()+ 1;
            //mes de vencimento;
            var mesvenc = mes + 1;
            if(mesvenc === 13 ){
                mesvenc = 1;
            };
            var ano = dataAtual.getFullYear();
            //criando strings do jeito que é esperado na api para as datas de inicio e de fim de plano;
            var dataAtualString = dia+'/'+mes+'/'+ano;
            var dataVencimentoPlano = dia+'/'+mesvenc+'/'+ano;
            var cpf_Salao = localStorage.getItem('cpf_salao'); 
            //obj a ser enviado a api;
            var limite = 0;
            console.log('no if'+ limite);
            if(Response.data.description === 'plano personalizado'){
                limite = localStorage.getItem('quntidadee');
                console.log('yes'+limite)
                // verificaçoes essenciais para os planos anoasis 
                //ajustar data de termino de plano
            }
            const Data = {
                "cpf_salao": cpf_Salao,
                "plano": Response.data.description,
                "data_inicio_plano": dataAtualString,
                "data_vencimento_plano": dataVencimentoPlano,
                "limite_funcionarios": limite,
                "assinatura_status": "on",
            };
            console.log(Data, "DATATATATA");
            await Api.put('/plano', Data).then((Response) => {
                console.log('planoooo', Response)
                if(Response.data === 'success'){
                    alert('Vocẽ já está com o acesso liberado a plataforma.');
                }else{};                
            }).catch((erro) =>{
                alert('seu pagamento foi aprovado porem ocorreu um erro na etapa de atualizar a base de dados. estatus code #102030. entre em contato com o suporte');
            })
            document.querySelector('#Title').innerHTML = "Pagamento Aprovado!";
            document.querySelector('#alerta').innerHTML = "seu pagamento foi aprovado, agora é so fazer login na plataforma.";
        }else if(Response.data === 'recusado'){
            document.querySelector('#Title').innerHTML = "Pagamento Recusado!";
            document.querySelector('#alerta').innerHTML = "seu pagamento foi recusado, tente novamente mais tarde!.";
        };        
    }).catch((Erro) => {
        document.querySelector('#Title').innerHTML = "Erro ao comunicar-se com o servidor!!!";
        alert('Erro ao comunicar-se com o servidor!!!');
    });
    return(
        <div>
            <div id="pendente_Conteiner">
                <h1 id="Title">Pendente!</h1>
                <br/>
                <p id="alerta"></p>
                <br/>
                <br/>
                <a href="/">Voltar para a página principal.</a>
                <br/>
                <br/>
                <a href="/loginsalao">fazer login</a>
            </div>
        </div>
    );
}