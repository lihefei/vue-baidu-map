<template>
    <div class="draw-item" @click="iconClick">
        <i class="draw-icon" :class="'draw-icon-' + type"></i>
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
    padding: 7px 10px;
    cursor: pointer;
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
        .draw-icon-hander {
            background-position: 0px (-$size);
        }
        .draw-icon-circle {
            background-position: -$size (-$size);
        }

        .draw-icon-polygon {
            background-position: -$size * 2 (-$size);
        }
        .draw-icon-rectangle {
            background-position: -$size * 3 (-$size);
        }
        .draw-icon-polyline {
            background-position: -$size * 4 (-$size);
        }
        .draw-icon-marker {
            background-position: -$size * 5 (-$size);
        }
    }

    .draw-icon {
        display: block;
        width: $size;
        height: $size;

        background-image: url('data:image/png;base64,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');

        background-repeat: no-repeat;
    }

    .draw-icon-hander {
        background-position: 0 0;
    }
    .draw-icon-circle {
        background-position: -$size 0;
    }

    .draw-icon-polygon {
        background-position: -$size * 2 0;
    }
    .draw-icon-rectangle {
        background-position: -$size * 3 0;
    }
    .draw-icon-polyline {
        background-position: -$size * 4 0;
    }
    .draw-icon-marker {
        background-position: -$size * 5 0;
    }
}
</style>
