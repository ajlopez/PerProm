
function Promised() {
	var thenfn;
	var catchfn;
	
	this.resolve = function (value) {
		if (thenfn)
			thenfn(value);
	};
	
	this.reject = function (err) {
		if (catchfn)
			catchfn(err);
	};
	
	this.then = function (fn, fnerr) {
		if (fn && typeof fn === 'function')
			thenfn = fn;
			
		if (fnerr && typeof fnerr === 'function')
			catchfn = fnerr;
	}
}

function Promise(fn) {
	var thenfn;
	var catchfn;
	
	var resolved = false;
	var resolvedval;
	
	var rejected = false;
	var rejectedval;
	
	setTimeout(function() {
		try {
			fn(resolve, reject);
		}
		catch (err) {
			reject(err);
		}
	});
	
	function resolve(value) {
		resolved = true;
		resolvedval = value;
		
		if (thenfn) {
			thenfn(value);
			thenfn = null;
		}
	}
	
	function reject(value) {
		rejected = true;
		rejectedval = value;
		
		if (catchfn) {
			catchfn(value);
			catchfn = null;
		}
	}
	
	this.then = function(fn, fnerr) {
		var promised = new Promised();
		
		if (fn && typeof fn === 'function')
			thenfn = function (value) {
				promised.resolve(fn(value));
			}
			
		if (fnerr && typeof fnerr === 'function')
			catchfn = function (err) {
				promised.reject(fnerr(err));
			}
		
		return promised;
	}
}

function createPromise(fn) {
	return new Promise(fn);
}

module.exports = {
	promise: createPromise
}