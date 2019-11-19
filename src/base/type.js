export function typeOf(obj) {
    let toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function': 'function',
        '[object Array]': 'array',
        '[object Date]': 'data',
        '[object Undefined]': 'undefined',
        '[object Object]': 'object',
        '[object Null]': 'null',
        '[object RegExp]': 'regExp'
    }
    return map[toString.call(obj)];
}
export var isArray = (obj) => typeof (obj) === 'array'

export var isRegExp = (obj) => typeof (obj) === 'regExp'