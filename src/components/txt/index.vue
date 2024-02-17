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
                    <button @click="prevMatch" :disabled="_numMatch == 0">
                        <i class="mdi mdi-arrow-up"></i>
                    </button>
                    <button @click="nextMatch" :disabled="_numMatch == 0">
                        <i class="mdi mdi-arrow-down"></i>
                    </button>
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
        currentMatch: 0,
    }),
    computed: {
        /**
         * Num coincidencias de busquedas
         * y muestra la cantidad
         * @returns { number }
         */
        _numMatch() {
            const matches = this.result.split(' ').filter((w) => {
                return w.includes('<span')
            });
            return matches.length
        },
        match_text() {
            let text = '';
            if (this._numMatch) {
                text = `${this._numMatch} match`;
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
        _listOfSpanMatch() {
            const spans = document.querySelectorAll('span.highlight');
            return Array.from(spans);
        },
        prevMatch() {
            const arr = this._listOfSpanMatch();
            const span  = arr[this.currentMatch];
            span.scrollIntoView();

            if (0 < this.currentMatch) {
                this.currentMatch--;
            } else {
                this.currentMatch = arr.length -1;
            }
        },
        nextMatch() {
            const arr = this._listOfSpanMatch();
            const span = arr[this.currentMatch]
            span.scrollIntoView();
            
            if (this.currentMatch < arr.length - 1) {
                this.currentMatch++;
            }
            else {
                this.currentMatch = 0;
            }
        },
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