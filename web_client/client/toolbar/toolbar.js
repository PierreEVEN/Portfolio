import {Router} from "../pages/router";

require('./toolbar.scss')

class Toolbar {
    constructor(container) {
        container.innerHTML = ''
        container.append(require('./toolbar.hbs')({}, {
            goto: (path) => {
                Router.goto(path)
            }
        }))
    }
}

export {Toolbar}