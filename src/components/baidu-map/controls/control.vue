<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-control',
    mixins: [commonMixin('control')],
    props: {
        anchor: {
            type: String,
            default: 'BMAP_ANCHOR_TOP_RIGHT'
        },
        offset: {
            type: Object,
            default() {
                return {
                    width: 10,
                    height: 10
                };
            }
        }
    },
    watch: {
        anchor(val) {
            this.originInstance.setAnchor(val);
        },
        'offset.width': function(val, oldVal) {
            const { BMap, offset, originInstance } = this;
            if (val !== oldVal) {
                let size = createSize(BMap, {
                    width: val,
                    height: offset.height || 10
                });
                originInstance.setOffset(size);
            }
        },
        'offset.height': function(val, oldVal) {
            const { BMap, offset, originInstance } = this;
            if (val !== oldVal) {
                let size = createSize(BMap, {
                    width: offset.width || 10,
                    height: val
                });
                originInstance.setOffset(size);
            }
        }
    },
    mounted() {},
    methods: {
        load() {
            const { BMap, map, $el, anchor, offset } = this;
            const $emit = this.$emit.bind(this);
            class Control extends BMap.Control {
                constructor() {
                    super();

                    this.defaultAnchor = global[anchor];
                    this.defaultOffset = createSize(BMap, {
                        width: offset.width || 10,
                        height: offset.height || 10
                    });
                }
                /**
                 * 初始化控制器
                 */
                initialize() {
                    $emit('initialize', {
                        BMap,
                        map,
                        el: $el,
                        control: this
                    });
                    map.getContainer().appendChild($el);
                    return $el;
                }
            }

            this.originInstance = new Control();
            map.addControl(this.originInstance);
        }
    }
};
</script>
