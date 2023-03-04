import DuDialog from './src/index.vue'

import {App} from 'vue';

DuDialog.install = (app:App) => {
    app.component(DuDialog.name, DuDialog)
    return app
}

export default DuDialog