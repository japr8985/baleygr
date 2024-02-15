// import { defineAsyncComponent } from 'vue';
import Viewer from '@/components/viewer/index.vue';
import ViewerByFormat from '@/components/index.js';
import FileType from './helpers/FileType';
import '@/sass/main.scss';
export default {
    install: (app, options = {}) => {
        app.component('baleygr-viewer', Viewer);
        Object.keys(ViewerByFormat).forEach((key) => {
            app.component(ViewerByFormat[key].name, ViewerByFormat[key])
        });
        app.config.globalProperties.baleygr = {
            viewers: FileType,
        }
    }
}