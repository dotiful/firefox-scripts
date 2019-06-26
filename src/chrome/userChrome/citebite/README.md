# Citebite
Basiert auf der gleichnamigen Erweiterung. Mittels Kontextmenüeintrag unterhalb von "Alles markieren" kann ein markierter Abschnitt durch den Dienst 
auf http://citebite.com/ kenntlich gemacht und verlinkt werden.

Das Skript funktioniert zur Zeit nur mit http:-Seiten, bei Zitaten auf https-Seiten meldet http://citebite.com/ Zertifikatfehler. Beim Markieren 
eines Zitates und Generierung des Links wird ein Snapshot erstellt. Nachträglich durchgeführte Änderungen auf einer durch citebite.com verlinkten 
Seite werden also nicht berücksichtigt.

Das **Ergebnis des Skripts**:

![Screenshot Citebite](https://github.com/ardiman/userChrome.js/raw/master/citebite/scr_citebite.png)

ergibt einen Link wie http://pages.citebite.com/j1s6q2x4l0bqk

## Installation
Kopiere die uc.xul-Datei in den Chromeordner des Profils.
