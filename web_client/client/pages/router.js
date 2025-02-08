import {Main} from "./main/main";
import {Projects} from "./projects/projects";
import {Resume} from "./resume/resume";
import {Contact} from "./contact/resume";

class Router {
    static goto(path) {
        const obj = Router.load_from_path(path)
        if (obj !== null) {
            window.history.pushState({}, "", path);
        } else (Router.goto("/"))
    }

    static load_from_path(path) {
        const split = path.split("/").filter(Boolean)
        if (split.length === 0) {
            return new Main(document.getElementById('global-container'))
        } else {
            if (split[0] === "projects") {
                return new Projects(document.getElementById('global-container'))
            }
            if (split[0] === "resume") {
                return new Resume(document.getElementById('global-container'))
            }
            if (split[0] === "contact") {
                return new Contact(document.getElementById('global-container'))
            }
        }
        return null;
    }

}

addEventListener("popstate", (event) => {
    console.log(event)
});

export {Router}