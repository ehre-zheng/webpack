
// sessionStorage 封装
  'use strict';

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/)
    {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0)
      ? Math.ceil(from)
      : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++)
      {
        if (from in this &&
            this[from] === elt)
          return from;
      }
      return -1;
    };
  }
  const Sesskr = {};
  Sesskr.prefix = "";

  Sesskr._getPrefixedKey = function(key, options) {
    options = options || {};

    if (options.noPrefix) {
      return key;
    } else {
      return this.prefix + key;
    }

  };

  Sesskr.set = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    try {
      sessionStorage.setItem(query_key, JSON.stringify({"data": value}));
    } catch (e) {
      if (console) console.warn("Sesskr didn't successfully save the '{"+ key +": "+ value +"}' pair, because the sessionStorage is full.");
    }
  };

  Sesskr.get = function (key, missing, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(sessionStorage.getItem(query_key));
    } catch (e) {
        try {
            if(sessionStorage[query_key]) {
                value = JSON.parse('{"data":"' + sessionStorage.getItem(query_key) + '"}');
            } else{
                value = null;
            }
        } catch (e) {
            if (console) console.warn("Sesskr could not load the item with key " + key);
        }
    }
    if(value === null) {
      return missing;
    } else if (typeof value.data !== 'undefined') {
      return value.data;
    } else {
      return missing;
    }
  };

  Sesskr.sadd = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json;

    var values = Sesskr.smembers(key);

    if (values.indexOf(value) > -1) {
      return null;
    }

    try {
      values.push(value);
      json = JSON.stringify({"data": values});
      sessionStorage.setItem(query_key, json);
    } catch (e) {
      console.log(e);
      if (console) console.warn("Sesskr didn't successfully add the "+ value +" to "+ key +" set, because the sessionStorage is full.");
    }
  };

  Sesskr.smembers = function(key, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(sessionStorage.getItem(query_key));
    } catch (e) {
      value = null;
    }

    if (value === null)
      return [];
    else
      return (value.data || []);
  };

  Sesskr.sismember = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    return Sesskr.smembers(key).indexOf(value) > -1;
  };

  Sesskr.getAll = function () {
    var keys = Object.keys(sessionStorage);

    return keys.map(function (key) {
      return Sesskr.get(key);
    });
  };

  Sesskr.srem = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json,
        index;

    var values = Sesskr.smembers(key, value);

    index = values.indexOf(value);

    if (index > -1)
      values.splice(index, 1);

    json = JSON.stringify({"data": values});

    try {
      sessionStorage.setItem(query_key, json);
    } catch (e) {
      if (console) console.warn("Sesskr couldn't remove the "+ value +" from the set "+ key);
    }
  };

  Sesskr.rm =  function (key) {
    sessionStorage.removeItem(key);
  };

  Sesskr.flush = function () {
    sessionStorage.clear();
  };
 export default Sesskr;

