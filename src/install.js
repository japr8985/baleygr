// import { defineAsyncComponent } from 'vue';
import Viewer from '@/components/viewer/index.vue';
import ViewerByFormat from '@/components/index.js';
import FileType from './helpers/FileType';
import MimeTypeToExtension from './helpers/MimeTypeToExtension';
import '@/sass/main.scss';

export default {
    install: (app, options = {}) => {
        app.component('baleygr-viewer', Viewer);
        Object.keys(ViewerByFormat).forEach((key) => {
            app.component(ViewerByFormat[key].name, ViewerByFormat[key])
        });
        app.config.globalProperties.baleygr = {
            viewers: FileType,
            mimeTypeToExtension: MimeTypeToExtension
        }

        if (Object.keys(options).length > 0) {
            app.config.globalProperties.baleygr.options = {...options}
        }
    }
}