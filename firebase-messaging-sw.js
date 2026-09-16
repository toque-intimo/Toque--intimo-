importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD6QAON1t-W6E4465u3ACZ2bB25RIAKPBo",
  authDomain: "meucatalogoapp-c7e39.firebaseapp.com",
  projectId: "meucatalogoapp-c7e39",
  storageBucket: "meucatalogoapp-c7e39.firebasestorage.app",
  messagingSenderId: "311764083576",
  appId: "1:311764083576:web:ff645835519f9262031e8d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem em segundo plano recebida: ', payload);
  
  const notificationTitle = payload.notification.title || 'Novo Pedido Recebido!';
  const notificationOptions = {
    body: payload.notification.body || 'Você tem uma nova solicitação de pedido.',
    icon: '/Toque--intimo-/icon.png', // Altere para o caminho do ícone do seu app
    badge: '/Toque--intimo-/badge.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400], // Padrão de vibração
    sound: 'default' // Solicita ao SO que reproduza o som padrão de notificação
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

