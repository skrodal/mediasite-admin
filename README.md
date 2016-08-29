# MediasiteAdmin #

_This service is tailor-made for UNINETT AS and uses in-house developed APIs pertaining to a specific use-case. As it does **not** access Sonic Foundry's official Mediasite API, its re-usability is limited._  

Denne tjenesten er skreddersydd av/for UNINETT, krever UNINETT Dataporten og er avhengig av egenutviklede APIer. 

Tjenesten forventer tilgang til alle Dataporten scopes fra Mediasite API (basic, org, admin) og eCampus Kind API (basic, admin).  

## Om MediasiteAdmin ##

MediasiteAdmin er en klient for UNINETTs Mediasite tjeneste. Den tilbyr to tilgangsnivå:

* SuperAdmin - for UNINETT ansatte
* OrgAdmin - for medlemmer av Dataporten-gruppe `MediasiteAdmin`

...og tre ulike views: 

* Dashboard - for global stats; alle kan se
* Superadmin - for internbruk (abonnenter, stats, kostnader, diskbruk, etc); krever SuperAdmin rolle
* OrgAdmin - for abonnentbruk (stats, diskbruk, kostnader, etc); krever OrgAdmin rolle ('teknisk kontakt' i Kind)

For å få status som OrgAdmin må bruker altså få en invitasjonslenke (kan hentes via [MediasiteAPI](https://github.com/skrodal/mediasite-api)) 
av eksisterende Org/SuperAdmins.

## TODO ##

* Dato-selektor for lagringsdata (nå er siste 30 dager eneste valg i UI, API tillater mer...) 

## Avhengigheter ##

Systemet henter lagringsinfo fra UNINETTs egenutviklede Mediasite API:
 
 * https://github.com/skrodal/mediasite-api
 
 ...og eCampus Kind-API.
 
 * https://github.com/skrodal/ecampus-kind-api

Klient og APIer er registrert med Dataporten fra UNINETT AS.

## 3rd parties ##

- UI er en modifisert versjon av "AdminLTE", bruker UNINETTs Bootstrap template
- JSO v2 av Andreas Åkre Solberg (https://github.com/andreassolberg/jso)
- Se dist/plugins for andre 3rt party biblioteker brukt

### Annet ###

Utviklet av Simon Skrødal