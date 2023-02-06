//import test from 'tape';

const test = require('tape'); //just to execute the test file easily in the terminal

/* #1 - EXAMPLES OF HOW TO USE THE 'test()' METHOD: */

//The 'test' method takes two arguments: 
//1. Test name (as a string);
//2. A callback function that will execute the assertions
test('should return -1 when the value is not present in Array', function (t) {
    //First assertion we will see is the 'equal'
    //It takes two arguments: 
    //1. The expected result;
    //2. The actual result;
    //It will compare and check if the two values are equal
    t.equal(-1, [1, 2, 3].indexOf(4));

    //After running all the assertions we want for this single test
    //We need to 'end' it explicitly by calling '.end()'.
    //If we declare how many assertions we will be testing using the 't.plan(n)', where n is the amount of
    //assertions, any other assertion that exceeds this number will result in errors.
    //If our test callback returns a Promise, we SHOULD NOT call 't.end()', because the test will implicitly
    //end when our Promise resolves. If it gets rejected, the test will fail; if it fulfills, the test will end.
    t.end();
});

//Now it's time to test using different assertions
test('comparing values inside an object', (t) => {
    //If we compare two objects using the assertion 'equal', no matter what properties each one has,
    //or even if they have the same key-value pairs, being 'virtually' identical,
    //the assertion will consider it 'two different instances' of the object.
    //Therefore, the assertion equal will always evaluate to falsy.
    //In order to compare "what's inside" each object, we should use the 'deepEqual()' assertion
    const object_1 = {
        id: 1,
        name: `a`,
        value: true
    }; //we can declare variables inside the callback function of the 'test' method

    const object_2 = {
        id: 1,
        name: `a`,
        value: true
    }

    //To show how the assertion 'equal()' wouldn't be useful in this case
    t.equal(object_1, object_2, 'Should fail because will consider two different instances of the objects');
        //It is optional to use a third argument when calling the assertion method, which consists of a message that will
        //display further information about what the assertion is actually testing/comparing
    
    //Now to the assertion that could correctly compare the values inside our objects:
    t.deepEqual(object_1, object_2, 'Should pass evaluating both objects as if they were equal');

    t.end();

});

//If we want to write a test that should be skipped for now, we can use:
/*

test.skip('name of the test', (t) => {
    t.end();
});

The skipped test will be shown as 'failed' in the output.*/

//If we want only one test to be executed, we can use:
/*

test.only('name of the test', (t) => {
    t.end();
});

All other tests written in the file will be shown as 'failed' in the output.*/


/* #2 - LIST OF ASSERTIONS THAT CAN BE USED: */

test('just to show different assertions', (t) => {
    const value = true;

    const actual = 1;

    const expected = 2;

    t.ok(value, 'descriptive message of the test'); 
    //tests if the argument passed in 'value' is truthy, using the custom 'descriptive message of the test' in the output

    t.notOk(value, 'should fail because value is truthy'); 
    //tests if 'value' is falsy

    t.notEqual(actual, expected, 'should pass because the compared values are different');
    //tests if the two given values are different

    t.looseEqual(actual, expected, 'descriptive message of the test'); 
    //tests if the two values are equal while allowing coercion in the equality comparison (similar to using '==' )

    t.notLooseEqual(actual, expected, 'descriptive message of the test');
    //same as above, but testing if the values are different from each other

    t.deepEqual(actual, expected, 'descriptive message of the test');
    //compares if the two values have the same structure and compares the nested values of each other

    t.notDeepEqual(actual, expected, 'descriptive message of the test');
    //same as above, but checking for differences

    t.deepLooseEqual(actual, expected, 'descriptive message of the test');
    //tests if both values have the same structure and nested values using loose comparisons (==)
    //We also have a "notDeepLooseEqual()"

    //t.test('name of subtest', (t) => {})
    //create a "subtest" inside the test

    t.comment('this method prints a message in the output without breaking the test output');

    t.match('string', 'regexp', 'descriptive message of the test');
    //to compare if a given string matches a given Regular Expression. We also have a "doesNotMatch() assertion method"

    t.end();
});


/* #3 - HOW TO EXECUTE THE TESTS: */

//a) Using 'browserify' on CLI:
//$ browserify test/*.js | tape-run (will run all test files in the test directory)
//(if you don't have it installed, try installing using 'sudo apt install node-browserify')

//b) using 'rollup' on CLI:
//$ rollup test/learn-tape.test.js -c | tape-run
//(if you don't have it installed, try installing using 'sudo apt install rollup')

//c) running the test file as a node module:
//$ node test/learn-tape.test.js

//d) with webpack:
//set up a webpack by writting a file 'webpack.test.config.js' to bundle all tape tests and execute them.

//e) using tape-run command on CLI:
//first we need to install it
//$ npm install tape-run -g (to install it globally)
//then:
//$ tape-run test/learn-tape.test.js