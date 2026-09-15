// Importa os scripts do Firebase compatíveis com Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Inicialize o Firebase com as SUAS credenciais reais do projeto
firebase.initializeApp({
  apiKey: "AIzaSyD6QAOn1t-W6E4465u3ACZ2bB25RIAkpbo",
   authDomain: "meucatalogoapp-c7e39.firebaseapp.com",
   projectId: "meucatalogoapp-c7e39",
   storageBucket: "meucatalogoapp-c7e39.appspot.com",
   messagingSenderId: "311764083576",
   appId: "1:311764083576:web:2630353079ec5294031e8d", 
});

const messaging = firebase.messaging();

// Gerencia notificações recebidas quando o app está em segundo plano ou fechado
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida em segundo plano: ', payload);

  const notificationTitle = payload.notification.title || "Novo Pedido Chegou! 🚀";
  const notificationOptions = {
    body: payload.notification.body || "Abra o aplicativo para ver os detalhes.",
    icon: "/icon-192x192.png", // Certifique-se de ter um ícone na pasta
    badge: "/icon-192x192.png",
    vibrate: [200, 100, 200, 100, 200], // Vibração forte para chamar atenção
    tag: "novo-pedido"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Ação ao clicar na notificação (traz o app para o foco)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
