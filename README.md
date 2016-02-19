# README #

TODO: Update README ;-)

NOTE 1: Non-functional; work in progress. 
NOTE 2: This service is tailor-made for UNINETT. It requires the "Feide Connect" Service Platform and in-house developed APIs to function.

# Om MediasiteAdmin #

MediasiteAdmin er en klient skreddersydd for UNINETTs Mediasite tjeneste. Den tilbyr to tilgangsnivå:

* SuperAdmin - for UNINETT ansatte
* OrgAdmin - for abonnent teknisk kontakt

The app offers three views: 

* Dashboard - for global stats; alle kan se
* Superadmin - for internbruk (abonnenter, stats, kostnader, diskbruk, etc); krever SuperAdmin rolle
* OrgAdmin - for abonnentbruk (stats, diskbruk, kostnader, etc); krever OrgAdmin rolle ('teknisk kontakt' i Kind)

### Avhengigheter ###

Systemet leser fra UNINETTs egenutviklede Mediasite API og Kind-API.

Klient og APIer er registrert med Dataporten fra UNINETT AS.

### Credits ###

Utviklet av Simon Skrødal

### 3rd parties ###

- UI er en modifisert versjon av "AdminLTE", bruker UNINETTs Bootstrap template
- Se JS plugins for andre 3.parts biblioteker brukt