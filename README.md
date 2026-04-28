# NRT ACC Setup Hub - Blue/Green Theme

ACC Setup-Datenbank im NRT Style mit Login, Setup-Datenbank und Supabase-Vorbereitung.

## Lokal starten

```bash
npm install
npm run dev
```

## Supabase aktivieren

1. Supabase-Projekt erstellen
2. `.env.example` kopieren und in `.env` umbenennen
3. `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` eintragen
4. SQL aus `supabase/schema.sql` im Supabase SQL Editor ausführen
5. App neu starten

Ohne Supabase läuft die App im Demo-Modus mit localStorage.

## Theme

Die Farben liegen zentral in `src/styles.css` unter `:root`. Dort kannst du Blau/Grün jederzeit anpassen.

## Version 4

Teams und die Status-Kachel oben rechts wurden entfernt. Die App ist jetzt schlanker und fokussiert auf Setups.

## Version 5

Neu: klickbares Rating und Copy-Setup-Button auf jeder Setup-Karte.

## Tabs NRT UI Version

V5 UI wurde behalten und um Setup-Tabs erweitert: Reifen, Elektronik, Mechanischer Grip, Stossdämpfer und Spoiler. Rating und Copy bleiben erhalten.

## Version 9

Tabs wurden neu angeordnet und laufen nicht mehr über die Linie hinaus. Layout ist jetzt responsiv.

## Version 12

Aktuelle ACC-Konsolenstrecken und Fahrzeuge ergänzt. Notizen entfernt. SVG-Icons für Elektronik, Stossdämpfer und Spoiler eingebaut.

## Version 13

Spur, Sturz und Nachlauf wurden vom Tab Mechanischer Grip in den Tab Reifen verschoben.

## Version 15

Fix: Spur, Sturz und Nachlauf sind jetzt sichtbar im Reifen-Tab und aus Mechanischer Grip entfernt.

## Version 16

Forced Fix: kompletter Tab-Panel-Bereich neu geschrieben. Reifen enthält Reifen/Spur/Sturz/Nachlauf; Mechanischer Grip enthält keine Spur/Sturz/Nachlauf mehr.

## Version 19

Voller Setup-Vergleich ergänzt: zwei Setups nebeneinander, alle Setupwerte nach Kategorien, Unterschiede hervorgehoben.
