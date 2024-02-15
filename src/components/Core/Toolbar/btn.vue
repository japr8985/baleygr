<template>
    <button class="btn" :style="style">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'btn-baleygr',
    computed: {
        style() {
            return '';
        },
        _fontSize() {
            return ''
        }
    }
};
</script>