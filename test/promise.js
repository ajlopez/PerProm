
var pp = require('..');

exports['create and resolve promise'] = function (test) {
	test.async();
	
	var promise = pp.promise(function (resolve, reject) {
		resolve(42);
	});
	
	promise.then(function (value) {
		test.equal(value, 42);
		test.done();
	});
};