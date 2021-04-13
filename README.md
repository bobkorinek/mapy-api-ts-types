# Mapy API - TypeScript types
*Languages*:
[Čeština](https://github.com/chriskorinek/mapy-api-ts-types/blob/master/README.cs.md)

## Contents
* [Description](#description)
* [Installation](#installation)
    - [Alternative installation](#alternative-installation)

## Description
Library contains interfaces for all classes, methods and properties from 
[*Mapy API* library](http://api.mapy.cz). All these types are created based
on [*Mapy API* documentation](http://api.mapy.cz) for version 4.13.

## Installation
Library is not yet as NPM package, but you can install it via `npm` like this: 
```sh
npm install -D 'https://github.com/chriskorinek/mapy-api-ts-types'
```
>Optionally you can insert `#<version-number>` or `#<commit-hash>` after the URL
for specifying the library version.

### Alternative installation
You might alternatively copy the `index.d.ts` to your directory and specify this
directory inside the `tsconfig.json` file in
[`typeRoots`](https://www.typescriptlang.org/tsconfig#typeRoots) option.
