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
        this.category_list = page.elements.category_list;
        this.language_list = page.elements.language_list;
        this.lib_list = page.elements.lib_list;
        this.graphic_list = page.elements.graphic_list;
        this.search_bar = page.elements.search_bar;
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

        this.category_list.innerHTML = '';
        for (const cat of Array.from(this.data.category.keys()).sort()) {
            const opt = document.createElement('button');
            opt.value = cat;
            opt.innerText = cat;
            this.category_list.append(opt)
        }

        this.language_list.innerHTML = '';
        for (const cat of Array.from(this.data.languages.keys()).sort()) {
            const opt = document.createElement('button');
            opt.value = cat;
            opt.innerText = cat;
            this.language_list.append(opt)
        }

        this.lib_list.innerHTML = '';
        for (const cat of Array.from(this.data.libs.keys()).sort()) {
            const opt = document.createElement('button');
            opt.value = cat;
            opt.innerText = cat;
            this.lib_list.append(opt)
        }

        this.graphic_list.innerHTML = '';
        for (const cat of Array.from(this.data.graphics.keys()).sort()) {
            const opt = document.createElement('button');
            opt.value = cat;
            opt.innerText = cat;
            this.graphic_list.append(opt)
        }
        for (const project of this.data.projects) {
            new Project(this.container, project);
        }
    }

    parse_data(db_data) {
        this.data = new ProjectData();

        const formater = (w) => {
            return w;//return w[0].toUpperCase() + w.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase();
        }

        for (const project of db_data.projects) {
            this.data.projects.push(project)

            if (project.category)
                for (const category of (typeof (project.category) === 'string' ? [project.category] : project.category)) {
                    const cat = formater(category);
                    if (!this.data.category.has(cat))
                        this.data.category.set(cat, []);
                    this.data.category.get(cat).push(project);
                }

            if (project.languages)
                for (const language of project.languages) {
                    const cat = formater(language);
                    if (!this.data.languages.has(cat))
                        this.data.languages.set(cat, []);
                    this.data.languages.get(cat).push(project);
                }

            if (project.libs)
                for (const lib of project.libs) {
                    const cat = formater(lib);
                    if (!this.data.libs.has(cat))
                        this.data.libs.set(cat, []);
                    this.data.libs.get(cat).push(project);
                }

            if (project.graphics)
                for (const graphic of (typeof (project.graphics) === 'string' ? [project.graphics] : project.graphics)) {
                    const cat = formater(graphic);
                    if (!this.data.graphics.has(cat))
                        this.data.graphics.set(cat, []);
                    this.data.graphics.get(cat).push(project);
                }
        }
    }


}

export {Projects}