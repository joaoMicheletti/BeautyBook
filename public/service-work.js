self.addEventListener('push', function(event) {
    const body = event.data?.text() ?? '';

    event.waitUntil(
        self.registration.showNotification('Flowly', {
            body,
            icon: '/favicon.png', // Caminho relativo para o ícone
            // Caso queira adicionar uma imagem maior (ex: logo grande), use o campo 'image'
            //image: '/assets/image/logoLogin.webp',
        })
    );
});