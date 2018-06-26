(() => {
  const keyToObjectMap = new Map();

  const createKey = () => {
    let key = Symbol(`metaproperties.key`);
    keyToObjectMap.set(key, new WeakMap());
    return key;
  };

  const defaultMap = new WeakMap();

  function createVars (map, object, value) {
    try {
      map.set(object, value);
    } catch (error) {
      throw new Error(`invalid target`);
    }
  }

  let lastObject,
    lastKey,
    lastVars;

  const meta = (object, key) => {
    if (object === lastObject && key === lastKey) {
      return lastVars;
    }
    const map = (key !== undefined) ? (keyToObjectMap.get(key)) : (defaultMap);
    if (!map) {
      console.log(map);
      throw new Error(`unknown \`key\``);
    }
    let vars = map.get(object);
    if (vars === undefined) {
      createVars(map, object, {});
    }
    lastObject = object;
    lastKey = key;
    lastVars = map.get(object);
    return lastVars;
  };

  meta.createKey = createKey;

  if (module && module.exports) {
    module.exports = meta;
    return;
  }

  let _global = 
    (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) ||
    this;
  let existingDefinition;
  if (existingDefinition = (_global ? _global.meta : meta)) {
      Object.defineProperty(meta, 'existingDefinition', {
        get () {
          return existingDefinition;
        }
      });
    }
  _global.meta = meta;
})();
