<template>
    <div class="toolbar" :style="styles">
        <div class="toolbar-items">
            <div class="left">
                <div class="toolbar-item">
                    <slot name="left">
                        <slot name="search">
                            
                        </slot>
                    </slot>
                </div>
            </div>
            <div class="center">
                <slot name="center"></slot>
            </div>
            <div class="right">
                <div class="toolbar-item">
                    <slot name="right">
                        <btn-baleygr @click="download">
                            <i class="mdi mdi-download"></i>
                        </btn-baleygr>
                        <btn-baleygr @click="print">
                            <i class="mdi mdi-printer"></i>
                        </btn-baleygr>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CoreBtn from './btn.vue';
export default {
    name: 'baleygr-toolbar',
    components: {
        'btn-baleygr': CoreBtn,
    },
    props: {
        printerFunction: {
            type: Function
        },
        downloadFunction: {
            type: Function
        },
        searchFunction: {
            type: Function
        }
    },
    computed: {
        _options() {
            const { options } = this.baleygr;
            return options?.toolbar;
        },
        styles() {
            const backgroundColor = this._options?.backgroundColor || '';
            const styles = `background-color: ${backgroundColor};`
            return styles;
        }
    },
    methods: {
        print() {
            this.printerFunction()
        },
        download() {
            this.downloadFunction()
        }
    }
};
</script>
<style></style>