import { setCurrentObserver } from "./core/index"


const autoRun = (callback) => {
    setCurrentObserver(callback);
    callback();
    setCurrentObserver(null);
}

export { autoRun };