require('./project.scss')

class Project {
    constructor(container, data) {
        const funcs = {};
        this.flip_flop = false;
        let item = require('./project.hbs')(data, funcs);
        funcs.expand = () => {
            this.flip_flop = !this.flip_flop;
            if (this.flip_flop) {
                item.elements.details.append(require('./project-details.hbs')(data, {}));
                item.elements.general.classList.add('general-open')
            } else {
                item.elements.details.innerHTML = '';
                item.elements.general.classList.remove('general-open')
            }
        }
        container.append(item);
    }
}

export {Project}