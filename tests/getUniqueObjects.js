'use strict';

const assert = require('assert');

const getUniqueObjects = require('../lib/getUniqueObjects');

describe('Get Unique Objects', () => {

	context('When Errors found', () => {

		it('Should throw if no objects are passed', () => {

			assert.throws(() => getUniqueObjects());
		});

		it('Should throw if items are not an array', () => {

			assert.throws(() => getUniqueObjects({ name: 'first' }));
		});

		it('Should throw if items are not objects', () => {

			assert.throws(() => getUniqueObjects([{ name: 'first' }, 'first']));
			assert.throws(() => getUniqueObjects(['first', { name: 'first' }]));
			assert.throws(() => getUniqueObjects([{ name: 'first' }, ['first']]));
			assert.throws(() => getUniqueObjects([['first'], { name: 'first' }]));
		});

		it('Should throw if options are invalid', () => {

			assert.throws(() => getUniqueObjects([{ name: 'first' }, { name: 'first' }], 'options'));
		});
	});

	const sameObject = {
		name: 'same',
		quantity: 100,
		items: ['door', 'glass'],
		place: {
			city: 'Central',
			country: 'Fake'
		}
	};

	const sameObjectLess = {
		name: 'same',
		quantity: 100,
		items: ['door', 'glass']
	};

	const sameObjectMore = {
		name: 'same',
		quantity: 100,
		items: ['door', 'glass'],
		place: {
			city: 'Central',
			country: 'Fake'
		},
		isActive: true
	};

	context('When Try to get Unique Objects without Normalize', () => {

		it('Should return empty if an empty array is passed', () => {

			assert.deepStrictEqual(getUniqueObjects([]), []);
		});

		it('Should return an array with the only itme if only one item is passed', () => {

			assert.deepStrictEqual(getUniqueObjects([sameObject]), [sameObject]);
		});

		it('Should return the same items if it are unique all of them', () => {

			assert.deepStrictEqual(getUniqueObjects([sameObject, sameObjectMore, sameObjectLess]), [sameObject, sameObjectMore, sameObjectLess]);
		});

		it('Should return only one item if it is repeated', () => {

			assert.deepStrictEqual(getUniqueObjects([sameObject, sameObject, sameObject]), [sameObject]);
		});

		it('Should return only items which are not repeated', () => {

			assert.deepStrictEqual(getUniqueObjects([sameObject, sameObjectMore, sameObjectLess, sameObjectMore, sameObject, sameObjectMore, sameObjectLess]),
				[sameObject, sameObjectMore, sameObjectLess]);
		});
	});

	context('When Try to get Unique Objects with Normalize', () => {

		it('Should return empty if an empty array is passed', () => {

			assert.deepStrictEqual(getUniqueObjects([], { fieldsToKeep: ['age'] }), []);
		});

		it('Should return an array with the only item but normalize if only one item is passed', () => {

			assert.deepStrictEqual(getUniqueObjects([sameObject], { fieldsToKeep: ['name'] }), [{ name: 'same' }]);
		});

		it('Should return the normalize items if it are unique all of them', () => {

			assert.deepStrictEqual(getUniqueObjects([sameObject, sameObjectLess, sameObjectMore], { fieldsToRemove: ['name'] }),
				[
					{
						quantity: 100,
						items: ['door', 'glass'],
						place: {
							city: 'Central',
							country: 'Fake'
						}
					},
					{
						quantity: 100,
						items: ['door', 'glass']
					},
					{
						quantity: 100,
						items: ['door', 'glass'],
						place: {
							city: 'Central',
							country: 'Fake'
						},
						isActive: true
					}
				]);
		});

		it('Should return only normalize item if it is repeated after normalize', () => {

			assert.deepStrictEqual(getUniqueObjects([sameObject, sameObjectLess, sameObjectMore], { fieldsToKeep: ['name'] }), [{ name: 'same' }]);
		});
	});
});
