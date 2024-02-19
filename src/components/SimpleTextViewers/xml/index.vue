<template>
    <div class="wrapper">
        <baleygr-toolbar :printerFunction="print" :downloadFunction="download">
            <template #search>
                <!-- <btn-baleygr @click="showSearchBox = !showSearchBox">
                    <i class="mdi mdi-magnify"></i>
                </btn-baleygr> -->
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
        <div class="xml-viewer">
            <div class="content">
                <pre lang="xml" v-text="result" />
            </div>
        </div>
    </div>
</template>
<script>
import Core from '../Core.vue'
import BtnBaleygr from '@/components/Core/Toolbar/btn.vue';
import Toolbar from '@/components/Core/Toolbar/index.vue';
export default {
    name: 'xml-viewer',
    mixins: [Core],
    components: {
        'btn-baleygr': BtnBaleygr,
        'baleygr-toolbar': Toolbar,
    },
    async mounted() {
        const text = await this.blob.text();
        this.result = this.fileContent = this.prettifyXml(text.trim());
    },
    methods: {
        prettifyXml(source) {
            const xmlDoc = new DOMParser().parseFromString(source, 'application/xml');
            const xsltDoc = new DOMParser().parseFromString([
                '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:strip-space elements="*"/>',
                '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
                '    <xsl:value-of select="normalize-space(.)"/>',
                '  </xsl:template>',
                '  <xsl:template match="node()|@*">',
                '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                '  </xsl:template>',
                '  <xsl:output indent="yes"/>',
                '</xsl:stylesheet>',
            ].join('\n'), 'application/xml');
            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
            const resultXml = new XMLSerializer().serializeToString(resultDoc);
            return resultXml;
        }
    }
};
</script>