//var _ = require('underscore');
// require function assumptions
// 1. Core module
// 2. File or folder
// 3. node_modules
//var result = _.contains([1,2,3],2);
//console.log(result);
// Concerning package.json
// ^ is a caret
// Major.Minor.Patch
// ^5.9.13 is like 5.x
// ~5.9.13 is like 5.9.x (using the latest x)
// 5.9.13 requires that exact version
var lion = require('lion-lib-382746');
var result = lion.add(1, 2);
console.log(result);