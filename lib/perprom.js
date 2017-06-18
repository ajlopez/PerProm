
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
			
		if (fnerr && typeof fnerr === 'function')
			catchfn = function (err) {
				promise.reject(fnerr(err));
			}
		
		return promise;
	}
}

function createPromise(fn) {
	return new Promise(fn);
}

module.exports = {
	promise: createPromise
}

