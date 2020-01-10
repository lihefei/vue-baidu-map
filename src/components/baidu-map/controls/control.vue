<template>
    <div><slot></slot></div>
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
        offset: Object
    },
    watch: {
        anchor(val) {
            this.originInstance.setAnchor(val);
        },
        offset(val) {
            this.originInstance.setOffset(val);
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
                    let defaultOffset = {
                        width: 10,
                        height: 10
                    };
                    
                    let settingOffset = Object.assign({}, defaultOffset, offset);
                    this.defaultAnchor = global[anchor];
                    this.defaultOffset = createSize(BMap, settingOffset);
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
