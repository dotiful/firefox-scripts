# RemovePrintTime
Dieses Skript sorgt daf�r, dass bei einem Ausdruck die Uhrzeit nicht gedruckt wird, indem die m�glichen about:config-Eintr�ge gescannt und ggf. 
die Einstellung "Uhrzeit/Datum" durch das aktuelle Datum ohne Uhrzeit (also "Benutzerdefiniert") ersetzt werden.

## Installation
Kopiere die uc.js-Datei in den Chromeordner des Profils. Passe die Namen der Drucker in Zeile 10 an. Bei Netzwerkdruckern, die bei der Suche nach 
`printer.print` unter `about:config` als `printer.print.\\Servername\Druckerfreigabe` zu sehen sind, m�ssen die Backslashs verdoppelt werden 
(`\\\\Servername\\Druckerfreigabe`).