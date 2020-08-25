<template>
    <div
        class="tool"
        :class="{ active: mode !== 'BMAP_NORMAL_MAP' }"
        :title="text"
        @click="toolClick"
    >
        <i class="iconfont icon-layer"></i>
        <span v-if="showText">&nbsp;{{ getModeText }}</span>
    </div>
</template>

<script>
export default {
    name: 'bm-tool-mode',
    props: {
        map: Object,
        BMap: Object,
        value: String,
        text: {
            type: String,
            default: '地图模式',
        },
        showText: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            mapConfig: {
                map: null,
                BMap: null,
            },
            mode: 'BMAP_NORMAL_MAP',
        };
    },
    computed: {
        getModeText() {
            let options = {
                BMAP_NORMAL_MAP: '地图',
                BMAP_HYBRID_MAP: '卫星',
            };
            return options[this.mode] || options.BMAP_NORMAL_MAP;
        },
    },
    watch: {
        map(map) {
            this.mapConfig.map = map;
        },
        BMap(BMap) {
            this.mapConfig.BMap = BMap;
        },
        value(mode) {
            this.mode = mode;
        },
        mode(mode) {
            this.map.setMapType(window[mode]);
            this.$emit('input', mode);
        },
    },
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
    },
    methods: {
        toolClick() {
            let mode =
                this.mode === 'BMAP_NORMAL_MAP'
                    ? 'BMAP_HYBRID_MAP'
                    : 'BMAP_NORMAL_MAP';
            this.mode = mode;
        },
    },
};
</script>

<style lang="scss" scoped>
.tool {
    display: inline-block;
    font-size: 14px;
    background: #fff;
    border: none;
    color: #606266;
    cursor: pointer;

    &.active {
        color: #409eff;
    }
}
</style>
