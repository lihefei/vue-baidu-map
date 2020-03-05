<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createPoint } from '../base/factory';
export default {
    name: 'bm-polygon',
    render() {},
    mixins: [commonMixin('overlay')],
    props: {
        path: Array,
        strokeColor: String,
        fillColor: String,
        strokeWeight: Number,
        strokeOpacity: Number,
        fillOpacity: Number,
        strokeStyle: String,
        massClear: Boolean,
        editing: Boolean,
        clicking: Boolean
    },
    watch: {
        path: {
            handler(val, oldVal) {
                this.reload();
            },
            deep: true
        },
        strokeColor(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setStrokeColor(val);
            }
        },
        fillColor(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setFillColor(val);
            }
        },
        strokeWeight(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setStrokeWeight(val);
            }
        },
        fillOpacity(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setFillOpacity(val);
            }
        },
        strokeOpacity(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setStrokeOpacity(val);
            }
        },
        strokeStyle(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setStrokeStyle(val);
            }
        },
        massClear(val) {
            val
                ? this.originInstance.enableMassClear()
                : this.originInstance.disableMassClear();
        },
        dragging(val) {
            val
                ? this.originInstance.enableDragging()
                : this.originInstance.disableDragging();
        },
        clicking() {
            this.reload();
        }
    },
    mounted() {},
    methods: {
        load() {
            const {
                $parent,
                path,
                strokeColor,
                fillColor,
                strokeWeight,
                fillOpacity,
                strokeOpacity,
                strokeStyle,
                massClear,
                editing,
                clicking
            } = this;

            const { BMap, map } = $parent;
            this.BMap = BMap;
            this.map = map;
            let pathPoint = path.map(p => createPoint(BMap, p));
            let overlay = new BMap.Polygon(pathPoint, {
                strokeColor,
                fillColor,
                strokeWeight,
                strokeOpacity,
                fillOpacity,
                strokeStyle,
                massClear,
                editing,
                clicking
            }); //创建线条

            this.originInstance = overlay;
            bindEvents.call(this, overlay);
            map.addOverlay(overlay);
        }
    }
};
</script>
