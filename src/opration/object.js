import { splitStr } from './string';

export function deepCopy(obj) {
	if (typeof obj !== 'object') return obj;
	let newObj = Array.isArray(obj) ? [] : {};

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = (typeof obj[key] !== 'object') ? obj[key] : deepCopy(obj[key]);
		}
	}
	return newObj;
}


// 从一个对象中挑选属性到新的对象中
// obj 需要获取属性的对象，keyStr: key字符串以空格分隔, deep: 是否深复制
export let pickCopy = (obj, pickKeys, deep) => {
	if (!obj || !pickKeys) return;
	let res = Array.isArray(obj) ? [] : {};
	let keys = splitStr(pickKeys);
	for (let k in obj) {
		if (obj.hasOwnProperty(k) && keys.indexOf(k) > -1) {
			res[k] = deep ? deepCopy(obj[k]) : obj[k];
		}
	}
	return res;
};
// 从对象拷贝属性，并排除一些属性; exclude
// 只排除根字段,obj不能为数组
export let excludeCopy = (obj, exclude, deep) => {
	let res = Array.isArray(obj) ? [] : {};
	let keys = splitStr(exclude);

	for (let k in obj) {
		if (!obj.hasOwnProperty(k) || keys.indexOf(k) > -1) continue;

		res[k] = deep ? deepCopy(obj) : obj[k];
	}

	return res;
};

/*  get */

// keys 为字段数组，按元素顺序访问obj属性
// 如：{a: {b:1}, b: 'ha'}; ['a','b']将获取a.b
export function getPropByKeys(obj, keys) {
	let key = keys.shift();

	if (key in obj) {
		// return obj[key]
		return keys.length ? getPropByKeys(obj[key], keys) : obj[key];
	}
	return undefined;
}
// keyStr like 'a.b.c'
export function getProp(obj, keyStr, splitter) {
	return getPropByKeys(obj, splitStr(keyStr, splitter || '.'));
}