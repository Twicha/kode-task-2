const getObjectProperty = (obj, path, defaultValue = undefined) => {
    // if (defaultValue !== undefined) потому что мы можем передать в defaultValue false или null,
    // но если нет обходимости передавать false, я бы написал проще if (defaultValue)
    if (defaultValue !== undefined) {
      return defaultValue;
    }
  
    if (obj && typeof obj === 'object' && typeof path === 'string') {
      const [firstKey, ...keys] = path.split('.');
  
      return keys.reduce((val, key) => {
        if (val) {
          return val[key];
        }
  
        return val;
      }, obj[firstKey]);
    }
  
    return defaultValue;
  };
  
  const obj = {
    pupa: {
      lupa: {
        beep: 'boop',
      },
      foo: 'bar',
    },
  };
  
  console.log(getObjectProperty(obj, 'pupa.lupa')); // > { beep : 'boop' }
  console.log(getObjectProperty(obj, 'pupa.lupa.beep')); // > 'boop'
  console.log(getObjectProperty(obj, 'pupa.foo')); // > 'bar'
  console.log(getObjectProperty(obj, 'pupa.ne.tuda')); // > undefined
  console.log(getObjectProperty(obj, 'pupa.ne.tuda', true)); // > true
  console.log(getObjectProperty(obj, 'pupa.ne.tuda', 'Default value')); // > 'Default value'
  