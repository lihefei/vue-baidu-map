<template>
    <div class="tool" :class="{active: isActive}" :title="text" @click="toolClick">
        <i class="iconfont icon-range-search"></i>
        <span v-if="showText">&nbsp;{{text}}</span>
    </div>
</template>
<script>
export default {
    name: 'bm-tool-range',
    props: {
        map: Object,
        BMap: Object,
        value: Boolean,
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
        value(val) {
            this.isActive = val;
        },
        isActive(val) {
            this.$emit('input', val);
        },
    },
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
    },
    methods: {
        toolClick() {
            this.isActive = !this.isActive;
            this.$emit('change', this.isActive);
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
