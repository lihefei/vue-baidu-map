<template>
    <div class="drawing-manager">
        <div
            v-for="(draw, index) in draws"
            @click="tabs(index)"
            class="draw-item"
            :class="{ active: index === active }"
        >{{ draw }}</div>
    </div>
</template>

<script>
export default {
    name: 'bm-drawing-manager',
    props: {
        selected: {
            type: String,
            default: 'hand'
        },
        draws: {
            type: Array,
            default() {
                return ['hand', 'polyline', 'circle', 'polygon', 'rectangle'];
            }
        }
    },
    data() {
        return {
            active: this.getSelectIndex(this.selected),
            center: { lng: 108.640996, lat: 19.065555 },
            radius: 60080,
            color: 'red'
        };
    },
    computed: {},
    watch: {
        selected(val) {
            this.active = this.getSelectIndex(val);
        }
    },
    methods: {
        tabs(index) {
            this.active = index;
            this.$emit('click', this.draws[index], index);
        },
        getSelectIndex(val) {
            let index = this.draws.indexOf(val);
            return index < 0 ? 0 : index;
        }
    }
};
</script>
<style lang="scss" scoped>
.drawing-manager {
    $radius: 2px;
    display: flex;
    justify-content: space-between;
    height: 32px;
    border-radius: $radius;
    font-size: 12px;
    line-height: 32px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

    .draw-item {
        cursor: pointer;
        padding: 0 10px;
    }
    .active {
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
