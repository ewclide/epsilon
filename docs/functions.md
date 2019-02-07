### Usage
just import the file before using.

```js
import { /* functions */ } from 'dewjs/funcs';
```

### browser

Not a function. Contains name of user browser as a string.
It supports browsers - *Chrome, Firefox, Opera, Safari, IE*

##
### printErr
( ***error*** : *Array*, ***source*** : *Boolean* ) => *false*

Allows to print errors in the console.

- **error* - can be string or array. If you want to print errors stack, then pass array with title property.
- *source* [true] - If true, then it prints the file where was called this function.

```js
const err = [];
err.title = 'You cant do it!';

err.push('first error');
err.push('second error');

printErr(err);

/*
  Error: You cant do it!
  --> first error
  --> second error
  -----
  Source: http://localhost:3000/core/index.js:81:11
*/
```

##
### isType
( ***value*** : *Any*, ***type*** : *String* ) => *Boolean* | *String*

Checks type of the value. Returns result of checking as Boolean.
Function, wich called with one argument will returns type of the passed value as string. If you pass array of types, then it checks value with each type in the array and returns true if value is one of this types.
*HTMLTools* - is a special type of objects produced through library html object.

- **value* - value itself.
- *type* - type as string. It supports types: *number, string, boolean, array, function, DOM, HTMLTools*.

```js
const some = [];
if (isType(some, 'array')) {
    // ...code
}

console.log(isType(some)); // array

// array of types
const other = 'hello';
if (isType(other, ['string', 'number']) {
    // ...code
}
```
##
### strParse
( ***value*** : *String* ) => *Any*

Parses and converts a string to type. Uses when result come as string and his necessary convert to the correct type. Supports types - *number, boolean, json, array*. If it can't converts a value, then it trims spaces and returns a string

- **value* - a string, wich must converted

```js
const arr = strParse('[1, 2, 3]');
console.log(arr) // [1,2,3]
```

##
### intParse
( ***value*** : *String* ) => *Integer Number*

Removes all not number chars from the string and returns integer number.

- **value* - a string, wich contains int number.

```js
const val = intParse('as125%7d');
console.log(val) // 1257
```

##
### floatParse
( ***value*** : *String* ) => *Float Number*

Removes all not number chars from the string and returns float number. Recognizes points and commas for separating real and fractional parts. If it founds two points (commas), then it removed all chars after second separator.

- **value* - a string, wich contains float number.

```js
const val = floatParse('as12,5%7d');
console.log(val) // 12.57
```

##
### jsonParse
( ***value*** : *String* ) => *JSON*

Recognizes json object in the string. More permissive then JSON.parse method. Not sensitive to quots.

- **value* - a string, wich contains json object.

```js
const json = jsonParse(`{ a: text, b: 'text2', "c": 123 }`);
console.log(json) // { a: "text", b: "text2", c: 123 }
```

##
### construct
*Deprecated* - you can use ES6 spread syntax ~ new Class(...args).

( ***class*** : *Class*, ***arguments*** : *Array* ) => *Object - instance*

Allows to invoke constructor with arguments as array. Uses when arguments generates in run time.

```js
class Test {
    constructor(a, b, c) {
        //...code
    }
}

const inst = construct(Test, [1,2,3]);
```

##
### publish
( ***class*** : *Class*, ***methods*** : *Array*, ***fields*** : *Array* ) => *Class*

Allows to publish specified fields and methods and encapsulate others. Returns new class.

- **class* - a class.
- **methods* - methods list, wich you want to publish.
- *fields* - fields list, wich you want to publish.

```js
class Test {
    constructor() {
        this.first = 'first';
        this.second = 'second';
    }

    doSomeThing() {
        console.log('something completed!')
    }

    doAnother() {
        console.log('another completed!')
    }
}

const TestPub = publish(Test, ['doSomeThing'], ['first']);
const inst = new TestPub();

console.log(inst.first, inst.second); // 1 undefined
inst.doSomeThing(); // something completed!
inst.doAnother(); // Uncaught TypeError: inst.doAnother is not a function
```
##
### getElementData
( ***settings*** : *Object*, ***defaults*** : *Object*, ***element*** : *DOM Element*, ***attributes*** : *Object* ) => *Object*

Compiles settings from different sources - *defaults, user settings and element data-attributes*.
At the begin it gets value from user object, after from attribute and at the end gets default.
All settings must have defaults values.
If attribute founds but is empty, then regards as *true* value.
If you want give special name to the attribute, then use attribute object, by default name of attribute regards as name of option with prefix "data-". Options writed through camel-case spelling will replaced by dash-case attributes.
Function also detects *Boolean* values in attrubtes.

- **settings* - object with user settings.
- **defaults* - default values.
- *element* - DOM element, wich contains attrubites.
- *attributes* - list of attributes, which corresponds to the settings.

```html
<!-- some where in template -->
<div
    data-other-option
    data-some-option="good"
    data-color="blue"
></div>
```

```js
// some where in code
const elem = document.getElementById('#spec');
const defs = {
    size: 150,
    color: 'red',
    otherOption: false,
    theSomeLongNamedOption: 'easy',
}

const attrs = {
    theSomeLongNamedOption: 'some-option'
}

const data = getElementData(settings, defs, elem, attrs);
console.log(data);
/* {
    size: 150,
    color: "blue",
    otherOption: true,
    theSomeLongNamedOption: "good"
} */
```

##
### fetchSettings
( ***settings*** : *Object*, ***defaults*** : *Object*, ***types*** : *Object*, ***rates*** : *Object* ) => *Object*

Compiles settings from defaults and user settings. It also allows to assign permissible types and values. All settings must have defaults values.

- **settings* - object with user settings.
- **defaults* - default values.
- *types* - permissible types.
- *rates* - list of permissible values.

```js
const defs = {
    width: 50,
    name : 'some',
    color: 'red',
};

const types = {
   width: 'number',
   name : ['string', 'number'],
   color: 'string'
}

const rates = {
   color: ['red', 'blue', 'green']
}

const config = {
    width: '100',
    color: 'blue'
}

const settings = fetchSettings(config, defs, types, rates);
console.log(settings);
/* {
    width: 50,
    name: "some",
    color: "blue"
} */
```

##
### randi
( ***min*** : *Number*, ***max*** : *Number* ) => *Number*

Returns random integer value.

- *min* [0] - min range value.
- *max* [999999] - max range value.

##
### randf
( ***min*** : *Number*, ***max*** : *Number*, ***size*** : *Number* ) => *Number*

Returns random float value.

- *min* [0] - min range value.
- *max* [1] - max range value.
- *size* - size of rounding.

```js
const val = randf(3, 10, 2);
console.log(val); // mkFqWeTGdp
```

##
### randKey
( ***length*** : *Number*, ***types*** : *Array* ) => *String*

Returns string of random chars.

- *length* [15] - length of result string.
- *types* [all] - List of char types, wich will be used. Available types - *all, lower, upper, numbers, specials*;

```js
const id = randKey(10, ['upper', 'lower']);
console.log(id); // mkFqWeTGdp
```

##
### idGetter
( ***prefix*** : *String* ) => *Function*

Returns function, wich returns unique value in own space (Just increment value)

- *prefix* - a string, wich will be added before value.

```js
const getName = idGetter('unique_');
console.log(getName()); // unique_1
console.log(getName()); // unique_2
// ...unique_3 and so on

const getId = idGetter();
console.log(getId(), getId() /*...*); // 1, 2 ...
```

##
### camelCaseToDash
(***string*** : *String*) => *String*

Converts string to camel-case spelling.

- **string* - a string itself.

```js
const str = camelCaseToDash('camelCaseToDash');
console.log(str); // camel-case-to-dash
```

##
### dashToCamelCase
(***string*** : *String*) => *String*

Converts string to dash-case spelling.

- **string* - a string itself.

```js
const str = dashToCamelCase('dash-to-camel-case');
console.log(str); // dashToCamelCase
```

##
### camelCaseMerge
(***word1, word2 ...*** : *Arguments*) => *String*

Merges list of words to camel-sace spelling word.

- **word1, word2 ...* - an arguments of words.

```js
const str = camelCaseMerge('hello', 'world', 'have', 'fun');
console.log(str); // helloWorldHaveFun
```

##
### trim
(string)

##
### capitalize
(***string*** : *String*, ***each*** : *Boolean*) => *String*

Trimes spaces in the string and converts first char in the word to upper-case.

- **string* - a string itself.
- *each* - if it's true, then all words in the string will be converted.

```js
const str = capitalize('hello world!');
const str2 = capitalize(' have   fun! ');
console.log(str, str2); // Hello world!, Have Fun!
```

##
### zeroPad
(number, size)

##
### vmin
(value)

##
### vmax
(value)

##
### vw
(value)

##
### vh
(value)

##
### clamp
(val, from, to)

##
### clampOut
(val, from, to)

##
### clampSide
(value, border, flip)

##
### clampAngle
(angle, radians = false)

##
### mirrAngle
(angle, radians = false)

##
### limitCalls
(function, count = 1)

##
### entry(val, from, to)

##
### log
(arguments)

##
### log.json
(json, spaces = 4)

##
### log.time
(name)

##
### log.timeEnd
(name)