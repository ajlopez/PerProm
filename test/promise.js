
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

exports['create and reject promise'] = function (test) {
	test.async();
	
	var promise = pp.promise(function (resolve, reject) {
		reject(42);
	});
	
	promise.then(function (value) {
		test.equal(value, 42);
		test.fail();
	}, function (err) {
		test.equal(err, 42);
		test.done();
	});
};

exports['throw as reject in promise'] = function (test) {
	test.async();
	
	var promise = pp.promise(function (resolve, reject) {
		throw 42;
	});
	
	promise.then(function (value) {
		test.equal(value, 42);
		test.fail();
	}, function (err) {
		test.equal(err, 42);
		test.done();
	});
};

exports['chain thens'] = function (test) {
	test.async();
	
	var promise = pp.promise(function (resolve, reject) {
		resolve(41);
	});
	
	promise.then(function (value) {
		return value + 1;
	}).then(function (value) {
		test.equal(value, 42);
		test.done();
	});
};

exports['chain three thens'] = function (test) {
	test.async();
	
	var promise = pp.promise(function (resolve, reject) {
		resolve(20);
	});
	
	promise.then(function (value) {
		return value + 1;
	}).then(function (value) {
		return value * 2;
	}).then(function (value) {
		test.equal(value, 42);
		test.done();
	});
};

exports['chain then that returns a promise'] = function (test) {
	test.async();
	
	var promise = pp.promise(function (resolve, reject) {
		resolve(41);
	});
	
	promise.then(function (value) {
		return pp.promise(function (resolve, reject) { resolve(value + 1); });
	}).then(function (value) {
		test.equal(value, 42);
		test.done();
	});
};

exports['chain then that returns a promise and reject it'] = function (test) {
	test.async();
	
	var promise = pp.promise(function (resolve, reject) {
		resolve(41);
	});
	
	promise.then(function (value) {
		return pp.promise(function (resolve, reject) { reject(value + 1); });
	}).then(function (value) {
		test.fail();
	}, function (err) {
		test.equal(err, 42);
		test.done();
	});
};

