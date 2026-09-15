// Importa os scripts do Firebase compatíveis com Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Inicialize o Firebase com as SUAS credenciais reais do projeto
firebase.initializeApp({
  apiKey: "AIzaSyD6QAON1t-W6E4465u3ACZ2bB25RIAKPBo",
  authDomain: "meucatalogoapp-c7e39.firebaseapp.com",
  projectId: "meucatalogoapp-c7e39",
  storageBucket: "meucatalogoapp-c7e39.firebasestorage.app",
  messagingSenderId: "311764083576",
  appId: "1:311764083576:web:ff645835519f9262031e8d",
  measurementId: "G-PEMCX62KT1" 
});

const messaging = firebase.messaging();

// Manipulador para receber as mensagens em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
