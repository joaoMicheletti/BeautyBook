import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-a3a91f75-8980-4843-b046-48155891a5d4');// chave pública

export default function Pagamento(){
    const Preference = localStorage.getItem('preferenceID');
    console.log(Preference)
    alert("para realizar seu pagamento click no botão azul. Apoz finalizalo click no botão 'voltar ao site' no final da tela!!!")
    return(
        <div>
            <div id="wallet_container">
                <Wallet initialization={{ preferenceId: Preference }} />
            </div>          
        </div>
    );        
};