import { pickCopy, getProp, excludeCopy } from '../../src/opration/object';
function genObj() {
	return {
		foo: 1,
		bar: {
			zero: 0
		},
		test: 'test'
	};
}
function genArr() {
	return [1, 2, { zero: 0, foo: { bar: 'bar' } }];
}
describe('opration/object pickCopy ', () => {
	it('pickCopy', () => {

		let target = {
			foo: 1,
			bar: {
				zero: 0
			},
			test: 'test'
		};
		let deepPick = pickCopy(target, 'bar foo', true);
		expect(deepPick.bar).toBeDefined();
		deepPick.bar.zero = 1;
		expect(deepPick.bar.zero !== target.bar.zero).toBeTruthy();
		expect(deepPick.foo).toBe(1);

		let pick = pickCopy(target, 'foo bar');

		expect(pick.bar.zero).toBe(0);
		pick.bar.zero = 1;
		expect(target.bar.zero).toBe(1);
	});
	it('opation/object excludeCopy', () => {
		let obj = genObj();
		// excludeCopy
		let excludeTest = excludeCopy(obj, 'test foo');
		expect(excludeTest.test).not.toBeDefined();
		expect(excludeTest.foo).not.toBeDefined();
		expect(excludeTest.bar === obj.bar).toBeTruthy();

		let deepEx = excludeCopy(obj, 'test foo', true);
		expect(deepEx.bar).toBeDefined();
		expect(deepEx.bar === obj.bar).not.toBeTruthy();

		let arr = genArr();
		let exArr = excludeCopy(arr, '0 2');
		expect(exArr[1] == arr[1]).toBeTruthy();
		expect(exArr[1] === arr[1]).toBeTruthy();
		expect(exArr[0]).not.toBeDefined();
		expect(exArr[2]).not.toBeDefined();
		let deepExArr = excludeCopy(arr, '0 2', true);

		expect(deepExArr[0]).not.toBeDefined();
		expect(deepExArr[2]).not.toBeDefined();
		expect(deepExArr[1] === arr[1]).not.toBeTruthy();
	});
	it('opation/object getProp', () => {
		let target = {
			a: {
				b: 1
			},
			b: 2
		};

		let getAB = getProp(target, 'a.b');
		expect(getAB === target.a.b).toBeTruthy();
		let getUndefined = getProp(target, 'a.c');

		expect(getUndefined).not.toBeDefined();

		let userSplitterGet = getProp(target, 'a#b', '#');

		expect(userSplitterGet === target.a.b).toBeTruthy();
	});
});