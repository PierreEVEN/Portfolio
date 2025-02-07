import {PageBase} from "../page_base";
import {Project} from "./widgets/project";


require('./projects.scss')

class ProjectData {
    constructor() {
        this.category = new Map();
        this.graphics = new Map();
        this.libs = new Map();
        this.languages = new Map();
        this.projects = [];
    }
}

class Projects extends PageBase {
    constructor(parent) {
        super(parent);
        const page = require('./projects.hbs')({}, {
            goto: (event, target) => {
                event.preventDefault();
                console.log("goto ", target)
            }
        });
        this.container = page.elements.container;
        parent.append(page)
        this.update();
    }

    async update() {
        const response = await (await fetch("/public/db.json")).json();
        this.parse_data(response);
        this.update_display();
    }

    update_display() {
        this.container.innerHTML = '';
        for (const project of this.data.projects) {
            new Project(this.container, project);
        }
    }

    parse_data(db_data) {
        this.data = new ProjectData();
        for (const project of db_data.projects) {
            this.data.projects.push(project)

            if (!this.data.category.has(project.category))
                this.data.category.set(project.category, []);
            this.data.category.get(project.category).push(project);

            for (const language of project.languages) {
                if (!this.data.languages.has(language))
                    this.data.languages.set(language, []);
                this.data.languages.get(language).push(project);
            }

            for (const lib of project.libs) {
                if (!this.data.libs.has(lib))
                    this.data.libs.set(lib, []);
                this.data.libs.get(lib).push(project);
            }

            if (!this.data.graphics.has(project.graphics))
                this.data.graphics.set(project.graphics, []);
            this.data.graphics.get(project.graphics).push(project);
        }
    }


}

export {Projects}