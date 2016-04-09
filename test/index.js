var SimpEvent = {
  listeners: {},

  on: function(name, listener) {
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

  once: function(name, listener) {
    var g = (...args) => {
      this.off(name, g);
      listener.apply(this, args);
    }

    this.on(name, g);
    return this;
  },

  emit: function(name, ...args) {
    var handler = this.listeners[name];
    if (!handler) return this;
    if (typeof handler == 'function') {
      handler.apply(this, args);
    } else {
      for (var listener in handler) {
        handler[listener].apply(this, args);
      }
    }
    return this;
  },

  off: function(name, listener) {
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
}

SimpEvent.once('haha', function() {
  console.log(arguments);
})

SimpEvent.emit('haha', 'yes');
SimpEvent.emit('haha', 'no');
