<template>
    <div class="text-viewer">
        <div class="content" ref="content" v-html="result" />
    </div>
</template>
<script>
import CoreViewersProp from '../Core/ViewersProps.vue';
export default {
    name: 'txt-viewer',
    mixins: [CoreViewersProp],
    data: () => ({
        fileContent: '',
        search: ''
    }),
    computed: {
        result() {
            return this.fileContent;// filtrar por elementos a buscar
        }
    },
    async mounted() {
        const text = await this.blob.text();
        this.fileContent = text.replaceAll('\n', '<br/>')
    }

};
</script>