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

function getDateTimeSince(target) {
    let seconds = Math.floor(target / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        months = Math.floor(days / 30),
        years = Math.floor(days / 365);
    days %= 30;
    months %= 12;

    let str = "";
    if (years > 0) {
        str += years + (years > 1 ? " years" : " year")
        if (months > 0)
            str += ", " + months + (months > 1 ? " months" : " month")
    } else if (months > 0) {
        str += months + (months > 1 ? " months" : " month")
        if (days > 0)
            str += ", " + days + (days > 1 ? " days" : " day")
    } else if (days > 0)
        str += days + (days > 1 ? " days" : " day")

    return str;
}

let CURRENT_SORT_FN = (a, b) => {
    return (b.score || 0) - (a.score || 0);
}
let CURRENT_FILTER_TEXT = "";
const SORT_FN = {
    "end date": (a, b) => {
        if (!a.end && b.end)
            return Date.parse(b.end);
        if (!b.end && a.end)
            return -Date.parse(a.end);
        if (!a.end && !b.end)
            return 0;
        return Date.parse(b.end) - Date.parse(a.end);
    },
    "start date": (a, b) => {
        if (!a.start && b.start)
            return Date.parse(b.start);
        if (!b.start && a.start)
            return -Date.parse(a.start);
        if (!a.start && !b.start)
            return 0;
        return Date.parse(b.start) - Date.parse(a.start);
    },
    "name": (a, b) => {
        return a.title === b.title ? 0 : a.title > b.title ? 1 : -1
    },
    "duration": (a, b) => {
        const a_dur = Date.parse(a.end) - Date.parse(a.start);
        const b_dur = Date.parse(b.end) - Date.parse(b.start);

        if (!a_dur && b_dur)
            return b_dur;
        if (!b_dur && a_dur)
            return -a_dur;
        if (!a_dur && !b_dur)
            return 0;
        return b_dur - a_dur;
    }
}

class Projects extends PageBase {
    constructor(parent) {
        super(parent);
        const page = require('./projects.hbs')({}, {
            goto: (event, target) => {
                event.preventDefault();
            }
        });
        this.container = page.elements.container;
        this.category_list = page.elements.category_list;
        this.language_list = page.elements.language_list;
        this.lib_list = page.elements.lib_list;
        this.graphic_list = page.elements.graphic_list;
        this.search_bar = page.elements.search_bar;
        this.sort_list = page.elements.sort_list;
        this.sort_btn = page.elements.sort_btn;
        page.elements.search_bar.oninput = () => {
            CURRENT_FILTER_TEXT = page.elements.search_bar.value;
            this.update_display();
        }
        parent.append(page)

        for (const cat of Object.keys(SORT_FN)) {
            const opt = document.createElement('button');
            opt.value = cat;
            opt.innerText = cat;
            opt.onclick = () => {
                CURRENT_SORT_FN = SORT_FN[cat];
                this.sort_btn.innerText = `Sort by ${cat}`;
                this.update_display();
            }
            this.sort_list.append(opt)
        }

        this.update();
    }

    async update() {
        const response = await (await fetch("/public/db.json")).json();
        this.parse_data(response);
        this.update_display();
    }

    update_display() {
        this.container.innerHTML = '';

        /*
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
*/
        const project_sorted = this.data.projects.sort(CURRENT_SORT_FN).filter((item) => {
            return CURRENT_FILTER_TEXT === "" ||
                item.title.includes(CURRENT_FILTER_TEXT) ||
                (item.description && item.description.includes(CURRENT_FILTER_TEXT))
        })

        for (const project of project_sorted) {
            let date = Date.parse(project.start);

            let end = Date.parse(project.end);

            let dur = end - date;
            if (dur) {
                dur = getDateTimeSince(new Date(end - date))
                project.duration = dur;
            }
            if (date)
                date = new Date(date).toDateString();
            if (end)
                end = new Date(end).toDateString();
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