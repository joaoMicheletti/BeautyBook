import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('YOUR_PUBLIC_KEY');// chave pública

export default function Pagamento(){
    return(
        <div id="wallet_container">
            <Wallet initialization={{ preferenceId: 'wallet_container' }} />
        </div>
    );
};