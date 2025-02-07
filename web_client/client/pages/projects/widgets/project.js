require('./project.scss')

class Project {
    constructor(container, data) {
        container.append(require('./project.hbs')(data, {}));
    }
}

export {Project}