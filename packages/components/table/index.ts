import DuTable from './src/index.vue'

import {App} from 'vue';

DuTable.install = (app:App) => {
    app.component(DuTable.name, DuTable)
    return app
}

export default DuTable