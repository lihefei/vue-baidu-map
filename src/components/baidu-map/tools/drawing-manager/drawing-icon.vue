<template>
    <div class="draw-item" @click="iconClick">
        <i class="iconfont" :class="'icon-' + type"></i>
        <!-- <i class="draw-icon" :class="'draw-icon-' + type"></i> -->
    </div>
</template>

<script>
export default {
    name: 'bm-drawing-icon',
    props: {
        type: String,
        index: Number
    },
    data() {
        return {};
    },
    watch: {},
    methods: {
        iconClick() {
            this.$emit('click', this.type, this.index);
        }
    }
};
</script>
<style lang="scss" scoped>
.draw-item {
    $radius: 2px;
    $size: 18px;
    padding: 0 10px;
    cursor: pointer;
    color: #409eff;
    &:hover {
        background-color: rgba(64, 158, 255, 0.1);
    }

    .iconfont {
        line-height: 32px;
        font-size: 20px;
    }

    .icon-clear {
        &:hover {
            color: rgb(245, 108, 108);
        }
    }

    &.active {
        color: #fff;
        background-color: #409eff;
        &:first-child {
            border-top-left-radius: $radius;
            border-bottom-left-radius: $radius;
        }
        &:last-child {
            border-top-right-radius: $radius;
            border-bottom-right-radius: $radius;
        }
    }
}
</style>
