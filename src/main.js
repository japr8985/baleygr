import { createApp } from 'vue'
import App from './App.vue'
import baleygr from './install.js';

const options = {
    // toolbar: {
        
    //     backgroundColor: 'blue'
    // }
}
createApp(App).use(baleygr, options).mount('#app')
