import DuInput from './src/index.vue'

import {App} from 'vue';

DuInput.install = (app:App) => {
    app.component(DuInput.name, DuInput)
    return app
}

export default DuInput