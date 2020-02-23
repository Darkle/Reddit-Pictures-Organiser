var nanoevents = function () {
  return {
    events: {},
    emit (event, ...args) {
      (this.events[event] || []).filter(i => i(...args));
    },
    on (event, cb) {
      (this.events[event] = this.events[event] || []).push(cb);
      return () => (
        this.events[event] = this.events[event].filter(i => i !== cb)
      )
    }
  }
};

export default nanoevents;
