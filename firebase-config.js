// Trage hier deine eigenen Firebase-Zugangsdaten ein.
// Du findest sie in der Firebase Console unter:
// Projekteinstellungen -> Allgemein -> "Meine Apps" -> Web-App

const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJEKT.firebaseapp.com",
  projectId: "DEIN_PROJEKT",
  storageBucket: "DEIN_PROJEKT.appspot.com",
  messagingSenderId: "DEINE_SENDER_ID",
  appId: "DEINE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
