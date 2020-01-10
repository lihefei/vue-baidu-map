<template>
    <div><slot></slot></div>
</template>
<script>
import commonMixin from '../base/mixins/common';
import { createPoint } from '../base/factory';
export default {
    name: 'bm-overlay',
    mixins: [commonMixin('overlay')],
    props: {
        pane: {
            type: String,
            default: 'floatPane'
        },
        position: Object
    },
    watch: {
        pane() {
            this.reload();
        },
        'position.lng': function(val, oldVal) {
            if (val !== oldVal && val >= -180 && val <= 180) {
                this.setPosition();
            }
        },
        'position.lat': function(val, oldVal) {
            if (val !== oldVal && val >= -90 && val <= 90) {
                this.setPosition();
            }
        }
    },
    mounted() {},
    methods: {
        load() {
            const { BMap, map, $el, pane, setPosition } = this;
            const $emit = this.$emit.bind(this);
            class CustomOverlay extends BMap.Overlay {
                /**
                 * 初始化自定义覆盖物
                 */
                initialize() {
                    $emit('initialize', {
                        BMap,
                        map,
                        el: $el,
                        overlay: this
                    });
                    map.getPanes()[pane].appendChild($el);
                    setPosition();
                    return $el;
                }

                /**
                 * 自定义覆盖物拖拽事件
                 */
                draw() {
                    $emit('draw', {
                        BMap,
                        map,
                        el: $el,
                        overlay: this
                    });
                }
            }

            const overlay = new CustomOverlay();
            this.originInstance = overlay;
            map.addOverlay(overlay);
        },
        setPosition() {
            let { BMap, $el, map, position } = this;
            let left = '0px';
            let top = '0px';

            if (position && typeof position.lng === 'number' && typeof position.lat === 'number') {
                let point = createPoint(BMap, position);
                let pixel = map.pointToOverlayPixel(point);
                left = pixel.x + 'px';
                top = pixel.y + 'px';
            }

            $el.style.setProperty('left', left);
            $el.style.setProperty('top', top);
        }
    }
};
</script>
<style lang="scss" scoped></style>
