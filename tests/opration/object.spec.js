import { pickCopy } from '../../src/opration/object';

describe('opration/object', ()=>{
	it('pickCopy', ()=>{

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
});