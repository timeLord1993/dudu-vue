import DuButton from './src/index.vue';
import {App} from 'vue';

DuButton.install = (app:App) => {
    app.component(DuButton.name, DuButton)
    return app
}

export default DuButton