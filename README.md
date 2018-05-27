# metaproperties
Associate data with any object without modifying the object in any way. Implemented using `WeakMap`s. Works in browser and node.js.
```javascript
const varsof = require('metaproperties');

varsof(someObject).someProperty = {
  created: 'yesterday',
  foo: 'bar'
};

someObject.someProperty // undefined

varsof(someObject).someProperty.foo // bar
```

## motivation

There are many cases where one would like to store some information about or on an object, without affecting its state. For example, on objects created by an external library. Aside from defining a new property on the object, one would have to use a mapping implementation to associate the object with desired data.

Prior to the introduction of `Map`s/`WeakMap`s, objects couldn't be used as keys in hash-map-like implementations. Typically, and object would be assigned a unique string identifier as a property, which would be used as the key of a map object. However, the new data structures are designed solely to function as hash-maps, and they allow objects to be used as keys directly, which improves performance.

metaproperties is a thin abstraction over a `WeakMap`, offering some convenience and syntactic simplicity.

## installation
```console
npm install metaproperties --save
```

## syntax
```javascript
require('metaproperties')(object: Object [, key: Symbol]): Object
require('metaproperties').createKey(): Symbol
```

## usage
```javascript
const varsof = require('metaproperties');

let object = {
  weight: 100,
  shape: 'round',
  color: '#00ff00',
  child: {
    born: false
  }
};

varsof(object).secretProperty = 'foo';

console.log(object.secretProperty); // undefined, as expected

console.log(varsof(object).secretProperty); // foo, as expected
```

## objects unaffected
```javascript
let beforeProps = Object.getOwnPropertyNames(object), // properties on object
    beforeSyms = Object.getOwnPropertySymbols(object); // symbols on object
    
varsof(object).secretProperty = 'foo';

let afterProps = Object.getOwnPropertyNames(object),
    afterSyms = Object.getOwnPropertySymbols(object);
    
console.log(beforeProps.length === afterProps.length && beforeSyms.length ===
afterSyms.length); // true, as expected

let same = true;
beforeProps.forEach((prop, i) => {
  same = same && beforeProps[i] === afterProps[i]
});
beforeSyms.forEach((sym, i) => {
  same = same && beforeSyms[i] === afterSyms[i]
});

console.log(same); // true, as expected
```

## performance
Without using the secret key functionality described below, performance is just slightly slower than native.

Run `benchmark.js`; this does not test secret key functionality. The first line represents native (setting properties directly on object) performance, and the second line represents metaproperties' performance. My typical results in node.js:
```console
31.93ms average (native)
38.68ms average (metaproperties)
```

Performance penalty should be minimal if `varsof(...)` is not used in critical
performance sections. 

Please let me know if your results differ!

Using the secret key functionality results in twice as slow as native performance; however, performance issues should generally not be noticeable.

## secret keys
Specify a key to use as an access key. Must use `varsof.createKey` to create a
key.
```javascript
const varsof = require('metaproperties');

let key = varsof.createKey();

varsof(someObject, key).bigSecret = 'abc123';

varsof(someObject).bigSecret // undefined, as expected

varsof(someObject, key).bigSecret // 'abc123';
```

Dispose of access keys once no longer needed:
```javascript
varsof.destroyKey(key: Symbol): void
```

## license
MIT

## feedback
Create issues here on github or email `metapropertiesfeedback [at symbol] [google's email service]`.
