import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import api from './services/api';

// >>> LÓGICA ADICIONADA (SEM ALTERAR O RESTO)
const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
  navigator.userAgent
);

const isWebView = /(Instagram|FBAN|FBAV|Line|Twitter)/i.test(
  navigator.userAgent
);
// <<< FIM DA LÓGICA ADICIONADA

if ('serviceWorker' in navigator && !isMobile && !isWebView) {
  navigator.serviceWorker
    .register('/service-work.js')
    .then(async serviceWorker => {
      let subscription = await serviceWorker.pushManager.getSubscription();

      if (!subscription) {
        const publicKeyResponse = await api.get('/publickkey');
        console.log(publicKeyResponse);

        subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKeyResponse.data,
        });
      }

      console.log(subscription);
    })
    .catch(() => {
      // erro silenciado para não quebrar produção
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
