import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-a400f1a4-8491-4929-8253-882375f28264');// chave pública

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