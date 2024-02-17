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
    components: {
        'btn-baleygr': CoreBtn,
    },
    props: {
        blob: {
            type: Blob,
            required: true,
        },
        printerFunction: {
            type: Function
        }
    },
    name: 'baleygr-toolbar',
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
        }
    }
};
</script>
<style></style>