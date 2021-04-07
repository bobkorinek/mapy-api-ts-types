# Mapy API - TypeScript typy
*Jazyky*:
[English](https://github.com/chriskorinek/mapy-api-ts-types/blob/master/README.md)

## Obsah
* [Popis](#popis)
* [Instalace](#instalace)
    - [Alternativní instalace](#alternativní-instalace)

## Popis
Knihovna obsahuje rozhraní pro všechny třídy, metody a vlastnosti z
knihovny [*Mapy API*](http://api.mapy.cz). Všechny tyto typy jsou
vytvořeny za základě všech dostupných informací z [dokumentace pro
*Mapy API*](http://api.mapy.cz) verze 4.13.

## Instalace
Knihovna není zatím jako NPM package, ale můžete jí přes `npm`
nainstalovat následovně: 
```sh
npm install -D 'https://github.com/chriskorinek/mapy-api-ts-types'
```
>Případně můžete za URL
dosadit `#<version-number>` nebo `#<commit-hash>`, jestli chcete 
specifikovat konkrétní verzi knihovny.

### Alternativní instalace
Alternativně si můžete zkopírovat soubor `index.d.ts` do vašeho adresáře a
následně adresář tohoto souboru uveďte v souboru `tsconfig.json` u 
proměnné [`rootTypes`](https://www.typescriptlang.org/tsconfig#typeRoots).
