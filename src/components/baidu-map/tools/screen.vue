<template>
    <div class="tool" :class="{active: isFull}" :title="text" @click="toolClick">
        <i class="iconfont" :class="isFull ? 'icon-collapse' : 'icon-expand'"></i>
        <span v-if="showText">&nbsp;{{text}}</span>
    </div>
</template>
<script>
export default {
    name: 'bm-tool-screen',
    props: {
        text: {
            type: String,
            default: '全屏切换',
        },
        showText: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFull: false,
        };
    },

    watch: {
        isFull(flag) {
            this.$emit('change', this.isFull);
        },
    },
    mounted() {},
    methods: {
        toolClick() {
            this.isFull = !this.isFull;
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
