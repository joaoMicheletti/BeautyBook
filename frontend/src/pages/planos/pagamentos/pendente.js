import React from "react";
//import { useNavigate, useParams } from "react-router-dom";
//import Api from "../../../services/api";

export default function Pendente(){
    const currentURL = window.location.href;

    // Remove o ponto de interrogação no início da URL, se presente
    const queryString = currentURL.includes('?') ? currentURL.split('?')[1] : currentURL;

    // Crie um objeto URLSearchParams a partir da string de consulta
    const params = new URLSearchParams(queryString);

    // Agora você pode acessar os parâmetros individualmente
    const collectionId = params.get('collection_id');
    const collectionStatus = params.get('collection_status');
    const paymentId = params.get('payment_id');
    const status = params.get('status');
    const external_reference = params.get('external_reference');
    const payment_type = params.get('payment_type');
    const merchat_order_id = params.get('merchat_order_id');
    const preference_id = params.get('preference_id');
    const site_id = params.get('site_id');
    const processing_mode = params.get('processing_mode');
    const merchat_account_id = params.get('merchat_account_id');


    return(
        <div>
            <h1>Pendente!</h1>
        </div>
    );
}