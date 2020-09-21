'use strict';

const areObjectsEquals = require('are-objects-equals');
const objectsNormalizer = require('objects-normalizer');
const F = require('press-f');

const ERROR_NAME = 'Get Unique Object Error';

module.exports = (items, options) => {

	if(!items)
		throw new F('No Items passed', ERROR_NAME);

	if(!Array.isArray(items))
		throw new F('Invalid Items. Must be An Array', ERROR_NAME);

	const itemsFormatted = objectsNormalizer(items, options);

	if(itemsFormatted.length < 2)
		return itemsFormatted;

	const uniqueItems = [itemsFormatted.shift()];

	itemsFormatted.forEach(item => {

		if(!uniqueItems.some(uniqueItem => areObjectsEquals(item, uniqueItem)))
			uniqueItems.push(item);
	});

	return uniqueItems;
};
