# README #

Denne tjenesten er skreddersydd av/for UNINETT, krever UNINETT Dataporten og er avhengig av egenutviklede APIer.

# Om MediasiteAdmin #

MediasiteAdmin er en klient for UNINETTs Mediasite tjeneste. Den tilbyr to tilgangsnivå:

* SuperAdmin - for UNINETT ansatte
* OrgAdmin - for abonnent teknisk kontakt

...og tre ulike views: 

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