# Login-Web-App (Tailwind/daisyUI + Firebase)

Eine Web-App mit Registrierung, Login und Logout im Design deiner
"Schule als Staat"-Seite (Tailwind CSS + daisyUI, lila Theme).
Passwörter werden **nicht** von dir selbst gespeichert — das übernimmt
Firebase Authentication sicher (gehasht, nach Industriestandard).

## Dateien
- `index.html` – dein Design + Login- und Registrierungsformular
- `app.js` – Logik für Registrierung/Login/Logout
- `firebase-config.js` – hier trägst du deine eigenen Firebase-Zugangsdaten ein

## Hinweis zu deinem Original-Export
Deine hochgeladene ZIP enthielt neben der HTML-Datei auch eine lokale
Kopie der Tailwind-/daisyUI-Dateien (`full.css`, `3.4.17`) — das waren
keine eigenen Dateien von dir, sondern die CDN-Skripte, die dein Browser
beim Speichern der Seite automatisch mit heruntergeladen hat. Ich habe
sie durch die offiziellen CDN-Links ersetzt (siehe `<head>` in
`index.html`), das ist leichter zu pflegen und du musst nichts davon
in dein Repo hochladen.

## Einrichtung (5 Minuten)

1. Gehe zu https://console.firebase.google.com und erstelle ein neues Projekt (kostenlos).
2. Klicke im Projekt links auf **Build > Authentication** → **Get started** → aktiviere
   die Methode **E-Mail/Passwort**.
3. Klicke links auf **Build > Firestore Database** → **Datenbank erstellen** →
   Testmodus wählen (für den Start reicht das).
4. Gehe zu **Projekteinstellungen** (Zahnrad oben links) → scrolle zu **Meine Apps**
   → klicke auf das **Web-Symbol (</>)** → gib der App einen Namen → registrieren.
5. Firebase zeigt dir jetzt ein Code-Snippet mit deinen Zugangsdaten
   (`apiKey`, `authDomain`, usw.). Kopiere diese Werte in die Datei
   `firebase-config.js` anstelle der Platzhalter.
6. Lade alle Dateien in dein GitHub-Repository hoch.
7. Aktiviere GitHub Pages (Settings → Pages → Branch: main) oder öffne
   `index.html` einfach lokal im Browser zum Testen.

## Wie es funktioniert
- Nutzer registrieren sich mit Benutzername + Passwort.
- Intern wandelt die App den Benutzernamen in eine interne "Fake-E-Mail"
  um (z.B. `max` → `max@meine-app.local`), damit Firebase Auth (das mit
  E-Mails arbeitet) genutzt werden kann — der Nutzer sieht davon nichts.
- Das Passwort wird niemals im Klartext gespeichert oder übertragen –
  das übernimmt Firebase.
- Der Benutzername wird zusätzlich in einer Firestore-Datenbank
  gespeichert, damit er später angezeigt werden kann.

## Erweiterungsideen
- Profilbilder oder weitere Nutzerdaten in Firestore speichern
- Passwort-vergessen-Funktion (Firebase bietet das für E-Mail-Konten)
- Eigene Inhalte pro Nutzer speichern (z.B. To-Dos, Notizen)

Wenn du willst, kann ich dir auch gleich eine Funktion hinzufügen,
mit der eingeloggte Nutzer eigene Daten speichern können.
