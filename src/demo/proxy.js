let target = {
  name: "target",
  value: 41
};

let proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    if (!trapTarget.hasOwnProperty(key) && isNaN(value)) {
      throw new Error("must be a number!");
    }
    return Reflect.set(trapTarget, key, value, receiver);
  },
  get(trapTarget, key, receiver) {
    if (!key in trapTarget) {
      throw new Error(key + " does not exit!");
    }
    return Reflect.get(trapTarget, key, receiver);
  },
  has(trapTarget, key) {
    // key in target
    if (key === "value") {
      return false;
    }
    return Reflect.has(trapTarget, key);
  },
  deleteProperty(trapTarget, key) {
    if (key === "value") {
      return false; // 'value' cannot be deleted
    }
    return Reflect.deleteProperty(trapTarget, key);
  },
  setPrototypeOf(trapTarget, proto) {
    return Reflect.setPrototypeOf(trapTarget, proto);
  },
  getPrototypeOf(trapTarget) {
    return Reflect.getPrototypeOf(trapTarget);
  }
});

let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
