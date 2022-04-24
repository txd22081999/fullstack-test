"use strict";
// INFO: getUrlParams
var problem1 = function () {
    var getUrlParams = function (pathString, patternString) {
        var PARAM_PREFIX = ':';
        var SEPERATOR = '/';
        var paths = pathString.split(SEPERATOR);
        var patterns = patternString.split(SEPERATOR);
        var isParam = function (str) { return str.startsWith(PARAM_PREFIX); };
        var result = {};
        for (var i = 0; i < paths.length; ++i) {
            var pathItem = paths[i];
            var patternItem = patterns[i];
            if (isParam(patternItem)) {
                // INFO: Param comparison
                if (!isParam(patternItem)) {
                    return result;
                }
                else {
                    var key = patternItem.replace(PARAM_PREFIX, '');
                    result[key] = pathItem;
                }
            }
            else {
                // INFO: Static comparison
                if (pathItem === patternItem) {
                    continue;
                }
                else {
                    return result;
                }
            }
        }
        return result;
    };
    console.log('======= PROBLEM 1 =======');
    // INFO: Test cases
    var pattern = 'staticOne/:paramOne/staticTwo/staticThree/:paramTwo';
    // Test 1: does not match the first static part: staticOne <> staticZero, returns {}
    console.log('TEST 1', getUrlParams('staticZero/one', pattern));
    // Test 2: matched the first static and param part, returns {paramOne: 'one'}
    console.log('TEST 2', getUrlParams('staticOne/one', pattern));
    // Test 3: matched the first static and param part with extra, returns {paramOne: 'one'}
    console.log('TEST 3', getUrlParams('staticOne/one/staticThree/three', pattern));
    // Test 4: matched the first, second and third static + param parts
    // returns {paramOne: 'one', paramTwo: 'two'}
    console.log('TEST 4', getUrlParams('staticOne/one/staticTwo/staticThree/two', pattern));
    // Test 5: empty pattern string, returns {}
    console.log('TEST 5', getUrlParams('staticOne/one/staticTwo/staticThree/two', ''));
    // Test 6: empty path string, returns {}
    console.log('TEST 6', getUrlParams('', pattern));
};
// INFO: objectLiteral
var problem2 = function () {
    var objectLiteral = function (before, after) {
        var keyValuePairsBefore = Object.entries(before);
        var keyValuePairsAfter = Object.entries(after);
        var keyValuePairs = keyValuePairsBefore.length > keyValuePairsAfter.length
            ? keyValuePairsBefore
            : keyValuePairsAfter;
        var result = {};
        for (var _i = 0, keyValuePairs_1 = keyValuePairs; _i < keyValuePairs_1.length; _i++) {
            var pair = keyValuePairs_1[_i];
            var key = pair[0], _ = pair[1];
            var beforeValue = before[key];
            var afterValue = after[key];
            if (beforeValue !== afterValue) {
                result[key] = { old: beforeValue, new: afterValue };
            }
        }
        return result;
    };
    // INFO: Test cases
    var test1 = function () {
        var before = { id: '1', count: 0 };
        var after = { id: '1', name: 'khan', count: 1 };
        // should return {name: {old: undefined, new: 'khan'}, count: {old: 0, new: 1}}
        console.log('TEST 1', objectLiteral(before, after));
    };
    var test2 = function () {
        var before = {};
        var after = { id: 1, count: 1 };
        // should return { id: { old: undefined, new: 1 }, count: { old: undefined, new: 1 } }
        console.log('TEST 2', objectLiteral(before, after));
    };
    var test3 = function () {
        var before = { record: null };
        var after = { id: '1', record: { hello: 'kitty' } };
        // should return { id: { old: undefined, new: '1' } }, count: { old: null, new: { record: 'kitty' } }
        console.log('TEST 3', objectLiteral(before, after));
    };
    // INFO: Run tests
    console.log('======= PROBLEM 2 =======');
    test1();
    test2();
    test3();
};
problem1();
problem2();
