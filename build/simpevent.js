(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('SimpEvent', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.SimpEvent = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    listeners: {},

    on: function on(name, listener) {
      if (typeof listener != 'function') return;
      this.emit('newListener', name, listener);
      if (!this.listeners[name]) {
        this.listeners[name] = listener;
      } else {
        if (typeof this.listeners[name] == 'function') {
          this.listeners[name] = [this.listeners[name], listener];
        } else {
          this.listeners[name].push(listener);
        }
      }
      return this;
    },

    once: function once(name, listener) {
      var _this = this;

      var g = function g() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        listener.apply(_this, args);
        _this.off(name, g);
      };
      this.on(name, g);
      return this;
    },

    emit: function emit(name) {
      var _this2 = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var handler = this.listeners[name];
      if (!handler) return this;
      if (typeof handler == 'function') handler.apply(this, args);else handler.map(function (listener) {
        return listener.apply(_this2, args);
      });
      return this;
    },

    off: function off(name, listener) {
      if (listener === undefined) {
        delete this.listeners[name];
      } else {
        if (typeof this.listeners[name] == 'function') {
          if (this.listeners[name] == listener) {
            delete this.listeners[name];
            this.emit('removeListener', name, listener);
          }
        } else {
          for (var i = 0; i < this.listeners[name].length; i++) {
            if (this.listeners[name][i] == listener) {
              this.listeners[name].splice(i, 1);
              this.emit('removeListener', name, listener);
            }
          }
        }
      }
      return this;
    }
  };
  module.exports = exports['default'];
});
