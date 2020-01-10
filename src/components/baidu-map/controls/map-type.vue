<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-map-type',
    mixins: [commonMixin('control')],
    props: {
        anchor: String,
        offset: Object,
        type: String,
        mapTypes: {
            type: Array,
            default() {
                return ['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']
            }
        }
    },
    watch: {
        anchor() {
            this.reload();
        },
        offset() {
            this.reload();
        },
        type() {
            this.reload();
        },
        mapTypes() {
            this.reload();
        }
    },
    methods: {
        load() {
            const { BMap, map, anchor, type, offset } = this;
            const mapTypes = [];
            this.mapTypes && this.mapTypes.forEach(item => mapTypes.push(global[item]));
            this.originInstance = new BMap.MapTypeControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset),
                type: global[type],
                mapTypes
            });

             map.addControl(this.originInstance);
        }
    },
    render() {}
};
</script>
