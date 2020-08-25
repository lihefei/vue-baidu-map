<template>
    <div class="tool" :class="{ active: visible }" :title="text" @click="toolClick">
        <i class="iconfont icon-traffic"></i>
        <span v-if="showText">&nbsp;{{text}}</span>
        <bm-traffic v-if="mapConfig.map && visible" />
    </div>
</template>
<script>
import BuiduTraffic from '../layers/traffic'; //路况叠加层
export default {
    name: 'bm-tool-traffic',
    components: {
        'bm-traffic': BuiduTraffic,
    },
    props: {
        map: Object,
        BMap: Object,
        text: {
            type: String,
            default: '路况',
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
            visible: true,
        };
    },

    watch: {
        map(map) {
            this.mapConfig.map = map;
        },
        BMap(BMap) {
            this.mapConfig.BMap = BMap;
        },
    },
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
    },
    methods: {
        toolClick() {
            this.visible = !this.visible;
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
