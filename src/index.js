import { autoRun } from "./autoRun";
import { observable } from "./observable";

/* const a = observable({ a: 1 })

autoRun(() => {
    console.log(a.a)
})

window.setTimeout(() => {
    a.a = 2
}, 3000) */

export { autoRun, observable };