<script>
import commonMixin from '../base/mixins/common';
import { createSize, createIcon } from '../base/factory';
export default {
    name: 'bm-panorama',
    mixins: [commonMixin('control')],
    props: {
        anchor: String,
        offset: Object
    },
    watch: {
        anchor() {
            this.reload();
        },
        offset() {
            this.reload();
        }
    },
    methods: {
        load() {
            const { BMap, map, anchor, offset } = this;
            const $emit = this.$emit.bind(this);

            this.originInstance = new BMap.PanoramaControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset),
                onChangeBefore() {
                    $emit('changeBefore');
                },
                onChangeAfter(e) {
                    $emit('changeAfter');
                }
            });
            map.addControl(this.originInstance);
        }
    },
    render() {}
};
</script>
