import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-a3a91f75-8980-4843-b046-48155891a5d4');// chave pública

export default function Pagamento(){
    const Preference = localStorage.getItem('preferenceID'); 
    return(
        <div>
            <div id="wallet_container">
                <Wallet initialization={{ preferenceId: Preference }} />
            </div>          
        </div>
    );        
};