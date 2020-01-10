<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-scale',
    mixins: [commonMixin('control')],
    props: {
        offset: Object,
        anchor: String
    },
    data() {
        return {};
    },
    watch: {},
    methods: {
        load() {
            const { BMap, map, anchor, offset } = this;

            this.originInstance = new BMap.ScaleControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset)
            }); // 左上角，添加比例尺

            map.addControl(this.originInstance);
        }
    },
    render() {}
};
</script>
