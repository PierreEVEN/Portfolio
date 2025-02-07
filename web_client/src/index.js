require("../client/styles.scss");

class Navbar {

    constructor() {
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

document.addEventListener("DOMContentLoaded", function (event) {
    componentLoader.scan();
}); 