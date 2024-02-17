<template>
    <div class="wrapper">
        <baleygr-toolbar :printerFunction="print" :downloadFunction="download">
            <template #search>
                <btn-baleygr @click="showSearchBox = !showSearchBox">
                    <i class="mdi mdi-magnify"></i>
                </btn-baleygr>
                <div class="menu" :class="{ 'open': showSearchBox }" tabindex="-1">
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
        </baleygr-toolbar>
        <div class="json-viewer">
            <code class="content">
                <pre  ref="content" v-html="result" />
            </code>
        </div>
    </div>
</template>
<script>
import Core from '../Core.vue'
import BtnBaleygr from '@/components/Core/Toolbar/btn.vue';
import Toolbar from '@/components/Core/Toolbar/index.vue';
export default {
    name: 'json-viewer',
    mixins: [Core],
    components: {
        'btn-baleygr': BtnBaleygr,
        'baleygr-toolbar': Toolbar,
    },
};
</script>