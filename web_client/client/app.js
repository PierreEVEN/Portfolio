
import "./utils/handlebars_helpers"
import {Router} from "./pages/router";
import {Toolbar} from "./toolbar/toolbar";

require('./app.scss');

const data = JSON.parse(document.body.dataset['app_config']);
Router.goto(data.path || "/")
new Toolbar(document.getElementById('toolbar-container'))
