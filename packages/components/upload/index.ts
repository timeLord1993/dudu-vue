import DuUpload from './src/index.vue'

import {App} from 'vue';

DuUpload.install = (app:App) => {
    app.component(DuUpload.name, DuUpload)
    return app
}

export default DuUpload