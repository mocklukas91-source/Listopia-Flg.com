const auth = firebase.auth();

// Da Firebase Auth eigentlich mit E-Mail arbeitet, wir aber Benutzernamen
// wollen, erzeugen wir intern eine "Fake-E-Mail" aus dem Benutzernamen.
// Das Passwort wird von Firebase sicher gehasht gespeichert - nie im Klartext.
function usernameToEmail(username) {
  return username.trim().toLowerCase() + "@meine-app.local";
}

function showLogin() {
  document.getElementById('register-box').classList.add('hidden');
  document.getElementById('login-box').classList.remove('hidden');
}

function showRegister() {
  document.getElementById('login-box').classList.add('hidden');
  document.getElementById('register-box').classList.remove('hidden');
}

async function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const messageEl = document.getElementById('register-message');
  messageEl.textContent = '';

  if (!username || !password) {
    messageEl.textContent = 'Bitte Benutzername und Passwort eingeben.';
    return;
  }
  if (password.length < 6) {
    messageEl.textContent = 'Passwort muss mind. 6 Zeichen haben.';
    return;
  }

  try {
    const email = usernameToEmail(username);
    const cred = await auth.createUserWithEmailAndPassword(email, password);

    // Benutzername im Auth-Profil speichern (kein Firestore nötig)
    await cred.user.updateProfile({ displayName: username });

    messageEl.style.color = 'green';
    messageEl.textContent = 'Registrierung erfolgreich! Du bist eingeloggt.';
  } catch (err) {
    messageEl.style.color = '#d9534f';
    messageEl.textContent = translateError(err.code);
  }
}

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const messageEl = document.getElementById('login-message');
  messageEl.textContent = '';

  if (!username || !password) {
    messageEl.textContent = 'Bitte Benutzername und Passwort eingeben.';
    return;
  }

  try {
    const email = usernameToEmail(username);
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    messageEl.textContent = translateError(err.code);
  }
}

function logout() {
  auth.signOut();
}

// Reagiert automatisch auf Login/Logout-Status
auth.onAuthStateChanged(async (user) => {
  const registerBox = document.getElementById('register-box');
  const loginBox = document.getElementById('login-box');
  const appBox = document.getElementById('app-box');

  if (user) {
    registerBox.classList.add('hidden');
    loginBox.classList.add('hidden');
    appBox.classList.remove('hidden');

    const username = user.displayName || user.email.split('@')[0];
    document.getElementById('welcome-username').textContent = username;

    // Automatische Weiterleitung nach erfolgreichem Login
    window.location.href = "https://www.listopia-flg.de";
  } else {
    appBox.classList.add('hidden');
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
  }
});

function translateError(code) {
  const map = {
    'auth/email-already-in-use': 'Dieser Benutzername ist bereits vergeben.',
    'auth/invalid-email': 'Ungültiger Benutzername.',
    'auth/weak-password': 'Passwort ist zu schwach (mind. 6 Zeichen).',
    'auth/user-not-found': 'Benutzername nicht gefunden.',
    'auth/wrong-password': 'Falsches Passwort.',
    'auth/invalid-credential': 'Benutzername oder Passwort falsch.'
  };
  return map[code] || 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.';
}
