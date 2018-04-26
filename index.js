{
  const _allMaps = new Map();
  const _createKey = () => {
    let key = Symbol('metaproperties.key');
    _allMaps.set(key, new WeakMap());
    return key;
  };
  const _defaultKey = _createKey();
  const _destroyKey = (key) => {
    if (typeof key !== 'symbol') {
      return false;
    }
    return _allMaps.delete(key);
  };
  const _varsof = (object, key) => {
    if (!key) {
      key = _defaultKey;
    }
    if (typeof key !== 'symbol') {
      throw new TypeError('invalid `key`');
    }
    if (!_allMaps.has(key)) {
      throw new Error('unknown `key`');
    }
    let vars = _allMaps.get(key);
    if (!vars.get(object)) {
      try {
        vars.set(object, {});
      } catch (error) {
        throw new Error('invalid target');
      }
    }
    return vars.get(object);
  };
  _varsof.createKey = _createKey;
  if (module && module.exports) {
    module.exports = _varsof;
    return;
  }
  let _global = 
    typeof self === 'object' && self.self === self && self ||
    typeof global === 'object' && global.global === global && global ||
    this ||
    false;
  let existingDefinition;
  if (existingDefinition = (_global ? _global.varsof : varsof)) {
      Object.defineProperty(_varsof, 'existingDefinition', {
        get () {
          return existingDefinition;
        }
      });
    }
  if (_global) {
    _global.varsof = varsof;
  } else {
    varsof = _varsof;
  }
}
