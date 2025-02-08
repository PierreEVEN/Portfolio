import {PageBase} from "../page_base";

require('./contact.scss')


class Contact extends PageBase{
    constructor(container) {
        super(container)
        container.append(require('./contact.hbs')({}, {}));
    }
}

export {Contact}