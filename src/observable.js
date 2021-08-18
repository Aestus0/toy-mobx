import { autoRun } from "./autoRun";
import { currentObserver, getObserver, isObservable, setObserver, setProxy } from "./core/index";

const toObserable = (object) => {
    const copy = { ...object };
    const result = {};
    Object.keys(object).forEach((key) => {
        Object.defineProperty(result, key, {
            configurable: true,
            enumerable: true,
            get() {
                if (currentObserver) {
                    setObserver(result, key, currentObserver);
                }
                return copy[key];
            },
            set(value) {
                copy[key] = value;
                getObserver(result, key).forEach(callback => {
                    autoRun(callback);
                })
            }
        });
    });
    setProxy(result);
    return result;
};

const observable = (object) => {
    return isObservable(object) ? object : toObserable(object);
};

export { observable };
