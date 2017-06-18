
function Promise(fn) {
	var thens = [];
	var catchs = [];
	
	var resolved = false;
	var resolvedval;
	
	var rejected = false;
	var rejectedval;
	
	setTimeout(function() {
		fn(resolve, reject);
	});
	
	function resolve(value) {
		resolved = true;
		resolvedval = value;
		
		if (thens.length)
			for (var k = 0; k < thens.length; k++)
				thens[k](value);
	}
	
	function reject(value) {
		rejected = true;
		rejectedval = value;
		
		if (catchs.length) {
			for (var k = 0; k < catchs.length; k++)
				catchs[k](value);
				
			catchs = [];
		}
	}
	
	this.then = function(fn, fnerr) {
		if (resolved)
			return fn(resolvedval);
			
		if (rejected)
			return fnerr(rejectedval);
			
		if (fn && typeof fn === 'function')
			thens.push(fn);
		
		if (fnerr && typeof fnerr === 'function')
			catchs.push(fnerr);
	}
}

function createPromise(fn) {
	return new Promise(fn);
}

module.exports = {
	promise: createPromise
}