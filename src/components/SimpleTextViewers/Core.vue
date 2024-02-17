<script>
export default {
    props: {
        blob: {
            type: Blob,
            required: true,
        },
    },
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
            const { type } = this.blob;
            printWindow.document.open(type)
            printWindow.document.write(text);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        },
        download() {
            const { type } = this.blob;
            const ext = this.baleygr.mimeTypeToExtension[type]
            const name = `${crypto.randomUUID()}.${ext}`;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(this.blob);
            link.download = name;
            link.click()
        }
    }
};
</script>