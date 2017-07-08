
function Promise(fn) {
	var thenfn;
	var catchfn;
	
	this.resolve = resolve;
	this.reject = reject;
	
	if (fn) {	
		setTimeout(function() {
			try {
				fn(resolve, reject);
			}
			catch (err) {
				reject(err);
			}
		});
	}
	
	function resolve(value) {
		if (value instanceof Promise) {
			value.then(function (value) {
				resolve(value);
			}, function (err) {
				reject(err);
			});
			
			return;
		}

		if (thenfn) {
			thenfn(value);
			thenfn = null;
		}
	}
	
	function reject(value) {
		if (catchfn) {
			catchfn(value);
			catchfn = null;
		}
	}
	
	this.then = function(fn, fnerr) {
		var promise = new Promise();
		
		if (fn && typeof fn === 'function')
			thenfn = function (value) {
				promise.resolve(fn(value));
			}
		else
			thenfn = function (value) {
				promise.resolve(value);
			}
			
		if (fnerr && typeof fnerr === 'function')
			catchfn = function (err) {
				promise.reject(fnerr(err));
			}
		else
			catchfn = function (err) {
				promise.reject(err);
			}
		
		return promise;
	}
	
	this.catch = function(fn) {
		if (fn && typeof fn === 'function') {
			var promise = new Promise();

			catchfn = function (err) {
				promise.reject(fn(err));
			}
					
			return promise;
		}
		
		return this;
	}
}

function createPromise(fn) {
	return new Promise(fn);
}

module.exports = {
	promise: createPromise
}

