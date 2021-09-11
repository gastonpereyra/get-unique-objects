# Get Unique Objects

## Code Quality Status
![Build Status](https://github.com/gastonpereyra/get-unique-objects/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://img.shields.io/coveralls/github/gastonpereyra/get-unique-objects/master.svg)](https://coveralls.io/r/gastonpereyra/get-unique-objects?branch=master)

![npm-get-unique-objects](https://user-images.githubusercontent.com/39351850/93025004-c710ef80-f5d0-11ea-83a5-d6a4fe8fcf98.png)

## Description
Get unique objects from array of objects (can be normalize before compare them)

## Installation

```
npm i get-unique-objects
```

## Params

`getUniqueObjects(items, options)`

### items

* Items to be filter
* Type: `Array` of `Object`
* Required

Example

```js
// Example - 1
[]

// Example - 2
[
    { name: 'Buenos Aires', country: 'Argentina'}
]

// Example - 3
[
    { name: 'Buenos Aires', country: 'Argentina'},
    { name: 'Villa Carlos Paz', country: 'Argentina', province: 'Córdoba' },
]
```

### options

* Options to normalize the objects before compare
* Type: `Object`
* Optional 

Example

```js
{
    fieldsToKeep: ["name", "number"]
}
```

:link: See more in [Object Normalize](https://github.com/gastonpereyra/objects-normalizer#options)

## Return

`getUniqueObjects(items, options) : uniqueItems`

* Items not repeated after normalize them, unique Items
* Type: `Array` of `Object`

## Usage

### getUniqueObjects([items])

Filter unique objects from items

```js
const getUniqueObjects = require('get-unique-objects');

const playerSample1 = {
    name: "Juan Román",
    lastname: "Riquelme",
    clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"],
    number: 10,
    stillPlaying: false,
    birthPlace: { country: "Argentina", province: "Buenos Aires", city: "Don Torcuato" }
};

const playerSample2 = {
    name: "Juan Román",
    lastname: "Riquelme",
    clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"],
    number: 10
}

getUniqueObjects([playerSample1, playerSample2]);

/*
output: [
    {
        name: "Juan Román",
        lastname: "Riquelme",
        clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"],
        number: 10,
        stillPlaying: false,
        birthPlace: { country: "Argentina", province: "Buenos Aires", city: "Don Torcuato" }
    },
    {
        name: "Juan Román",
        lastname: "Riquelme",
        clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"],
        number: 10
    }
]
*/

getUniqueObjects([playerSample1, playerSample1]);

/*
output: [
    {
        name: "Juan Román",
        lastname: "Riquelme",
        clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"],
        number: 10,
        stillPlaying: false,
        birthPlace: { country: "Argentina", province: "Buenos Aires", city: "Don Torcuato" }
    }
]
*/

getUniqueObjects([]);

/*
output: []
*/
```

### getUniqueObjects([items], options)

Filter unique objects from items after normalize them

```js
const getUniqueObjects = require('get-unique-objects');

const playerSample1 = {
    name: "Juan Román",
    lastname: "Riquelme",
    clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"],
    number: 10,
    stillPlaying: false,
    birthPlace: { country: "Argentina", province: "Buenos Aires", city: "Don Torcuato" }
};

const playerSample2 = {
    name: "Juan Román",
    lastname: "Riquelme",
    clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"],
    number: 10
}

getUniqueObjects([playerSample1, playerSample2], { fieldsToRemove: ["number", "stillPlaying", "birthPlace"] });

/*
output: [
    {
        name: "Juan Román",
        lastname: "Riquelme",
        clubs: ["Boca", "Barcelona", "Villareal", "Argentinos"]
    }
]
*/

const playerSample3 = {
    name: "Lionel",
    lastname: "Messi",
    clubs: ["Barcelona"],
    number: 10,
    stillPlaying: true
}

getUniqueObjects([playerSample1, playerSample2, playerSample3], { fieldsToKeep: ["name", "lastname"]});

/*
output: [
    {
        name: "Juan Román",
        lastname: "Riquelme"
    },
    {
        name: "Lionel",
        lastname: "Messi"
    }
]
*/

getUniqueObjects([playerSample1, playerSample2, playerSample3], { fieldsToKeep: ["number"]});

/*
output: [
    {
        number: 10
    }
]
*/
```