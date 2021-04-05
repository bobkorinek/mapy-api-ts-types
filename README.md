# Mapy API - typy pro TypeScript
Knihovna obsahuje rozhraní pro všechny třídy, metody a vlastnosti z
knihovny [API Mapycz](http://api.mapy.cz). Všechny tyto typy jsou
vytvořeny za základě všech dostupných informací z [dokumentace pro
API Mapycz verze 4.13](http://api.mapy.cz).

## Instalace
Knihovna není zatím jako NPM package, ale můžete jí přes `npm`
nainstalovat následovně: `npm install -D
'https://github.com/chriskorinek/mapycz-types'` (případně můžete za URL
dosadit `#<version-number>` nebo `#<commit-hash>`, jestli chcete 
specifikovat konkrétní verzi knihovny).
### Alternativní instalace
Alternativně si můžete zkopírovat soubor `index.d.ts` do vašeho adresáře a
následně adresář tohoto souboru uveďte v souboru `tsconfig.json` u 
proměnné [`rootTypes`](https://www.typescriptlang.org/tsconfig#typeRoots).
