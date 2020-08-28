<template>
    <div
        class="tool"
        :class="{ active: isActive }"
        :title="isActive ? '框选中，右键可退出框选状态' : text"
        @click.stop="toolClick"
    >
        <i class="iconfont icon-range-search"></i>
        <span v-if="showText">&nbsp;{{ text }}</span>
        <bm-polygon
            v-if="mapConfig.map"
            ref="rectangle"
            :path="path"
            strokeColor="red"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="false"
        />
    </div>
</template>
<script>
import BaiduMapPolygon from '../overlays/polygon'; //多边形覆盖物
export default {
    name: 'bm-tool-range',
    components: {
        'bm-polygon': BaiduMapPolygon,
    },
    props: {
        map: Object,
        BMap: Object,
        path: {
            type: Array,
            default() {
                return [];
            },
        },
        text: {
            type: String,
            default: '框选区域',
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
            isActive: false,
        };
    },

    watch: {
        map(map) {
            this.mapConfig.map = map;
        },
        BMap(BMap) {
            this.mapConfig.BMap = BMap;
        },
        isActive(val) {
            if (!val && this.path.length) {
                this.$emit('complete', { path: [...this.path] });
            }
            this.$emit('change', val);
        },
    },
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
    },
    methods: {
        toolClick() {
            this.isActive = !this.isActive;
        },
        setEnable(val = true) {
            this.isActive = val;
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
