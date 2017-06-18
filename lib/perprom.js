
function Promise(fn) {
	var thens = [];
	var resolved = false;
	var resolvedval;
	
	setTimeout(function() {
		fn(resolve, null);
	});
	
	function resolve(value) {
		resolved = true;
		resolvedval = value;
		
		if (thens.length)
			for (var k = 0; k < thens.length; k++)
				thens[k](value);
	}
	
	this.then = function(fn) {
		if (resolved)
			return fn(resolvedval);
			
		thens.push(fn);
	}
}

function createPromise(fn) {
	return new Promise(fn);
}

module.exports = {
	promise: createPromise
}