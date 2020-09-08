const data = {};

module.exports = {
  get(key) {
    if (data[key]) {
      if (new Date().getTime() - data[key].expires > 0) {
        return data[key].val;
      }
      delete data[key];
    }
    return null;
  },
  setex(key, expires, val) {
    data[key] = {
      val,
      expires: new Date().getTime() + expires * 1000
    };
    return true;
  },
  set(key, val) {
    return this.setex(key, 0, val);
  },
  del(key) {
    delete data[key];
    return true;
  }
};
