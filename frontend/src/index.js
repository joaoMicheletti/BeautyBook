import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import api from './services/api';

navigator.serviceWorker.register('service-work.js').then( async serviceWorker =>{
  let subscription = await serviceWorker.pushManager.getSubscription()

  if(!subscription){
    const publicKeyResponse = await api.get('/publickkey')
    console.log(publicKeyResponse)

    subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKeyResponse.data,
    })
  }
  console.log(subscription);
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

