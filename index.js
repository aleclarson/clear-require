'use strict';
var path = require('path');
var resolveFrom = require('resolve-from');
var callerPath = require('caller-path');

var clear = module.exports = function (moduleId) {
	if (typeof moduleId !== 'string') {
		throw new TypeError('Expected a string');
	}
	if (path.isAbsolute(moduleId)) {
		delete require.cache[moduleId];
	} else {
		clear(callerPath(), moduleId);
	}
};

clear.all = function () {
	var caller = callerPath();
	Object.keys(require.cache).forEach(function(moduleId) {
		if (path.isAbsolute(moduleId)) {
			delete require.cache[moduleId];
		} else {
			clear(caller, moduleId);
		}
	});
};

function clear(caller, moduleId) {
        delete require.cache[resolveFrom(path.dirname(caller), moduleId)];
}
