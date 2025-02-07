import {PageBase} from "../page_base";
import {Router} from "../router";


require('./main.scss')

class Main extends PageBase {
    constructor(parent) {
        super(parent);
        parent.append(require('./main.hbs')({}, {
            goto: (event, target) => {
                event.preventDefault();
                Router.goto(target)
            }
        }))
    }
}

export {Main}