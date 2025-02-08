import {PageBase} from "../page_base";

require('./resume.scss')


class Resume extends PageBase{
    constructor(container) {
        super(container)
        container.append(require('./resume.hbs')({}, {}));
    }
}

export {Resume}