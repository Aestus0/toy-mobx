// 所有代理对象
const proxies = new WeakMap();

// 注册的所有监听
const observers = new WeakMap();

// 当前执行的autoRun
let currentObserver = null;


const isObservable = (object) => {
    return proxies.get(object) === object;
};

const setProxy = (object) => {
    if (!isObservable(object)) {
        proxies.set(object, object);
    }
};

// 注册监听
const setObserver = (object, key, callback) => {
    if (isObservable(object)) {
        const observer = observers.get(object);
        if (!observer) {
            observers.set(object, new Map([[key, new Set([callback])]]));
        } else {
            observer.get(key).add(callback);
        }
    }
};

// 获取监听
const getObserver = (object, key) => {
    return observers.get(object) && observers.get(object).get(key);
}

const setCurrentObserver = (callback) => {
    currentObserver = callback;
}

export { isObservable, setProxy, setObserver, currentObserver, setCurrentObserver, getObserver };
