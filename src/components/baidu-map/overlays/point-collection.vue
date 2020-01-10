<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createPoint } from '../base/factory';
export default {
    name: 'bm-point-collection',
    render() {},
    mixins: [commonMixin('overlay')],
    props: {
        points: Array,
        size: {
            type: String,
            default: 'BMAP_POINT_SIZE_NORMAL'
        },
        shape: {
            type: String,
            default: 'BMAP_POINT_SHAPE_CIRCLE'
        },
        color: String
    },
    watch: {
        points: {
            handler(val) {
                const { originInstance } = this;
                originInstance.clear();
                originInstance.setPoints(val);
            },
            deep: true
        },
        shape(val) {
            const { originInstance, color, size } = this;
            originInstance.setStyles({
                shape: global[val],
                color,
                size: global[size]
            });
        },
        size(val) {
            const { originInstance, color, shape } = this;
            originInstance.setStyles({
                shape: global[shape],
                color,
                size: global[val]
            });
        },
        color(val) {
            const { originInstance, shape, size } = this;
            originInstance.setStyles({
                shape: global[shape],
                color: val,
                size: global[size]
            });
        }
    },
    mounted() {},
    methods: {
        load() {
            const { $parent, points, size, shape, color } = this;

            const { BMap, map } = $parent;

            let overlay = new BMap.PointCollection(
                points.map(p => createPoint(BMap, p)),
                {
                    shape: global[shape],
                    size: global[size],
                    color
                }
            ); // 创建海量点对象

            this.originInstance = overlay;
            bindEvents.call(this, overlay);
            map.addOverlay(overlay);
        }
    }
};
</script>
