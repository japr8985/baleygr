<template>
    <div class="wrapper">
        <toolbar :blob="blob" :printerFunction="print">
            <template #search>
                <btn-baleygr @click="showSearchBox = !showSearchBox">
                    <i class="mdi mdi-magnify"></i>
                </btn-baleygr>
                <div class="search-menu" :class="{ 'open': showSearchBox }" tabindex="-1">
                    <input type="text" name="search" v-model="search" placeholder="Buscar...">
                    <span class="match-text" v-text="match_text"></span>
                </div>
            </template>

        </toolbar>

        <div class="text-viewer">
            <div class="content" ref="content" v-html="result" />
        </div>
    </div>
</template>
<script>
import CoreViewersProp from '../Core/ViewersProps.vue';
import Toolbar from '../Core/Toolbar/index.vue';
import CoreBtn from '../Core/Toolbar/btn.vue';
export default {
    name: 'txt-viewer',
    components: {
        'toolbar': Toolbar,
        'btn-baleygr': CoreBtn,
    },
    mixins: [CoreViewersProp],
    data: () => ({
        fileContent: '',
        result: '',
        search: '',
        showSearchBox: false,
    }),
    computed: {
        /**
         * Num coincidencias de busquedas
         * y muestra la cantidad
         * @returns {string}
         */
        match_text() {
            let text = '';
            // const matches = this.$.querySelector('span.highlight');
            const matches = this.result.split(' ').filter((w) => {
                return w.includes('<span')
            });
            if (matches) {
                text = `${matches.length} match`;
            }
            return text;
        }
    },
    async mounted() {
        const text = await this.blob.text();
        this.result = this.fileContent = text.replaceAll('\n', '<br/>')
    },
    watch: {
        search(value) {
            this.searchInText(value)
        },
    },
    methods: {
        searchInText(search) {
            if (search) {
                this.result = this.fileContent.replaceAll(search, `<span class="highlight">${search}</span>`);
            } else {
                this.result = this.fileContent;
            }
        },
        print() {
            const text = this.$refs.content.innerHTML;
            const printWindow = window.open();
            printWindow.document.open('text/plain')
            printWindow.document.write(text);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            // printWindow.close();
        }
    }

};
</script>