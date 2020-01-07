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
export let pickPropertys = (obj, pickKeys, deep) => {
	if (!obj || !pickKeys) return;
	let res = {};
	let keys = splitStr(pickKeys);
	for (let k in obj) {
		if (obj.hasOwnProperty(k) && keys.indexOf(k) > -1) {
			res[k] = deep ? deepCopy(obj[k]) : obj[k];
		}
	}
	return res;
};
// 从对象拷贝属性，并排除一些属性; exclude
export let excludeObject = (obj, exclude, deep) => {
	let res = {};
	let keys = splitStr(exclude);

	for (let k in obj) {
		if (!obj.hasOwnProperty(k) || keys.indexOf(k) < 0) continue;

		res[k] = deep ? deepCopy(obj) : obj[k];
	}

	return res;
};