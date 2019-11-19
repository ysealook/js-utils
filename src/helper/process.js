
/**
 * 函数运行队列，只允许特定数量的函数在运行池中运行；其他函数将处于等待状态
 * @param {允许同时运行的最大数量} max 
 */
export var FnQueue = function (max) {
    this._qs = [];
    // 可以同时执行的最大数量（实际）
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
    }

    this.queue = function (fn) {
        if (Array.isArray(fn)) {
            fn.forEach(element => {
                if (typeof element === 'function') {
                    this.queue(element)
                }
            });
        } else {
            fn.__called = false;

            this._qs.push(fn);
            let qs = this._qs;

            // 不考虑最大限制数
            if (qs.length === 1) {
                this.next();
            }

        }
    }
}
