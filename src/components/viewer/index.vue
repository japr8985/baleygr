<template>
    <div class="baleygr-viewer">
        <component :is="viewer" :blob="blob"/>
    </div>
</template>
<script>

export default {
    props: {
        src: {
            type: String,
            required: true
        }
    },
    data: () => ({
        blob: new Blob([]),
    }),
    computed: {
        viewer() {
            const { type } = this.blob
            return (this.baleygr.viewers[type] || 'loading') + '-viewer';
        }
    },
    mounted() {
        this.loadFileFromUrl();
    },
    methods: {
        loadFileFromUrl() {
            fetch(this.src)
                .then((response) => response.blob())
                .then((blob) => {
                    console.log(blob)
                    this.blob = blob;
                });
        }
    }
};
</script>