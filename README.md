# Baleygr 
Es un plugin de Vue.js que te permite visualizar documentos en diferentes formatos, como PDF, Word, Excel y muchos más. 

Es una herramienta flexible y fácil de usar que se puede integrar en cualquier aplicación Vue.js.

## Características principales
- Soporte para múltiples formatos: Baleygr puede mostrar una amplia variedad de formatos de archivo, incluyendo PDF, Word, Excel, imágenes, audio y video.

- Navegación rápida: Baleygr te permite navegar por el documento fácilmente, con opciones para ir a una página específica, buscar texto y ampliar o reducir la vista.

- Interfaz personalizable: Puedes personalizar la interfaz de Baleygr para que coincida con el estilo de tu aplicación.
- Fácil de usar: Baleygr es muy fácil de usar e integrar en tu aplicación Vue.js.

```batch
npm install baleygr
```
```js
# ...
import { createApp } from 'vue'
import App from './App.vue'
import baleygr from 'baleygr';

const options = {
    ...
}

createApp().use(baleygr, options).mount('#app')
```

# Formatos soportados
|Extension| MIME Type  | Available|
|---------|------------|----------|
|.txt      | text/plain | ✅ |
- .json
- .csv
- .zip
- .pdf
- .xlsx
- .docx
- .jpeg
- .bmp
- .gif
- .webmp
- .ico

## Personalizar
### Toolbar
```js
const options = {
    toolbar: {
        backgroundColor: ''
    }
}
```