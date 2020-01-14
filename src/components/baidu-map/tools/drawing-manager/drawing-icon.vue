<template>
    <div class="drawing-manager">
        <div
            v-for="(draw, idx) in draws"
            @click="tabs(idx)"
            class="draw-item"
            :class="{ active: idx === index }"
        >
            <i :class=" `draw-icon  draw-icon-${draw}`"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bm-drawing-manager',
    props: {
        type: {
            type: String,
            default: 'hander'
        },
        draws: {
            type: Array,
            default() {
                return ['hander', 'circle', 'polygon', 'rectangle', 'polyline'];
            }
        }
    },
    data() {
        return {
            index: this.getIndex(this.type)
        };
    },
    watch: {
        type(val) {
            this.index = this.getIndex(val);
        }
    },
    methods: {
        tabs(index) {
            this.index = index;
            let type = this.draws[index];
            this.$emit('click', type, index);
        },
        getIndex(val) {
            let index = this.draws.indexOf(val);
            return index < 0 ? 0 : index;
        }
    }
};
</script>
<style lang="scss" scoped>
.drawing-manager {
    &,
    * {
        box-sizing: border-box;
    }
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
        padding: 5px 10px;
        $size: 18px;
        .draw-icon {
            display: inline-block;
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
    }
}
</style>
