require("../assets/stylesheets/styles.scss");

import ComponentLoader, {Component} from 'component-loader-js';

class Navbar extends Component {

    constructor() {
        super(...arguments);
        this.el.innerHTML = 'toto'
        this.el.classList.add('navbar-container')
        this.pageContainer = document.createElement('div')
        this.pageContainer.innerHTML = 'toto'
        this.el.appendChild(this.pageContainer)
    }

    destroy() {
        super.destroy();
    }

}

const componentLoader = new ComponentLoader({Navbar});

document.addEventListener("DOMContentLoaded", function (event) {
    componentLoader.scan();
}); 