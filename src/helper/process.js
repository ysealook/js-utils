
/**
 * 函数运行队列，只允许特定数量的函数在运行池中运行；其他函数将处于等待状态
 * 暂未实现多任务同时执行
 * @example 
 * ```js
 * var queue = new FnQueue();
 *  var fn100 = (next)=>{
 *      setTimeout(()=>{
 *          // 如果不调用next();将不会调用下一个任务
 *          console.log('100ms 后调用下一个函数fn200')
 *          next()
 *      }, 100)
 * }
 * var fn200 = (next)=>{
 *      console.log('fn100调用next后调用')
 *      setTimeout(()=>{
 *          console.log('将调用队列中的下一个函数，如果存在的话')
 *          next()
 *      }, 200)
 * }
 * queue.queue([fn100, fn200]);
 * 
 *  ```
 */
export var FnQueue = function () {
	this._qs = [];
	this._calledCount = 0;
	this._queueCount = 0;
	this.next = function () {
		if (this._qs.length) {
			let q = this._qs[0];
			if (q.__called) {
				this._qs.shift();
				q.__called = false;
				this.next();
			} else {
				q(this.next.bind(this));
				this._qs.shift();
				q.__called = true;
			}
		}
	};

	this.queue = function (fn) {
		if (Array.isArray(fn)) {
			fn.forEach(element => {
				if (typeof element === 'function') {
					this.queue(element);
				}
			});
		} else {
			fn.__called = false;

			this._qs.push(fn);
			let qs = this._qs;

			if (qs.length === 1) {
				this.next();
			}

		}
	};
};
// unfinish
export var timingQueue = (function () {

	var T = function (caps, lazy) {
		this._qs = [];
		this._caps = caps || 16.66666;
		this._lazy = lazy === undefined ? lazy : false;
	};

	T.prototype = {
		push(q) {
			this._queue.push(q);
		},
		start() {
			if (this._qs.length) {
				this._callFn();
			}
		},
		_callFn() {
			this.__t = setTimeout(() => {
				if (!this._qs.length) return;

				if (this._lazy) {
					this._qs[this._qs.length]();
					this._qs = [];
				} else {
					this._qs[0]();
					this._qs.shift();
				}
				this._callFn();

			}, this._caps);
		}
	};

	return T;
})();