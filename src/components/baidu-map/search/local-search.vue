<template>
    <div v-show="panel"><slot></slot></div>
</template>
<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
import { isPoint } from '../base/utils';
export default {
    name: 'bm-local-search',
    mixins: [commonMixin('search')],
    props: {
        location: [String, Object],
        keyword: String,
        renderOptions: Object,
        pageCapacity: Number,
        panel: Boolean,
        autoViewport: Boolean,
        selectFirstResult: Boolean,
        resultRender: Boolean
    },
    watch: {
        location() {},
        keyword(val) {
            this.originInstance.search(val);
        },
        resultRender() {
            this.reload();
        },
        pageCapacity(val) {
            this.originInstance.setPageCapacity(val);
        },
        autoViewport(val) {
            this.originInstance && (val ? this.originInstance.enableAutoViewport() : this.originInstance.disableAutoViewport());
        },
        selectFirstResult(val) {
            this.originInstance && (val ? this.originInstance.enableFirstResultSelection() : this.originInstance.disableFirstResultSelection());
        }
    },
    methods: {
        load() {
            const { BMap, map, $el, panel, originInstance, location, renderOptions, pageCapacity, keyword, resultRender, autoViewport, selectFirstResult } = this;

            const _location = location ? (isPoint(location) ? createPoint(BMap, location) : location) : map;

            const route = (this.originInstance = new BMap.LocalSearch(_location, {
                renderOptions: resultRender && {
                    map,
                    panel: $el,
                    selectFirstResult,
                    autoViewport
                },
                onMarkersSet: e => {
                    this.$emit('markersset', e);
                },
                onInfoHtmlSet: e => {
                    this.$emit('infohtmlset', e);
                },
                onResultsHtmlSet: e => {
                    this.$emit('resultshtmlset', e);
                },
                onSearchComplete: e => {
                    if (originInstance && originInstance !== route) {
                        originInstance.clearResults();
                    }
                    this.$emit('searchcomplete', e);
                }
            }));

            this.originInstance.search(keyword);
        }
    }
};
</script>
