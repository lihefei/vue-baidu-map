<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createPoint } from '../base/factory.js';
export default {
    name: 'bm-circle',
    render() {},
    mixins: [commonMixin('overlay')],
    props: {
        center: {},
        radius: Number,
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
        'center.lng': function(val, oldVal) {
            const { BMap, center, originInstance } = this;
            if (val !== oldVal && val >= -180 && val <= 180) {
                let point = createPoint(BMap, { lng: val, lat: center.lat });
                originInstance.setCenter(point);
            }
        },
        'center.lat': function(val, oldVal) {
            const { BMap, center, originInstance } = this;
            if (val !== oldVal && val >= -90 && val <= 90) {
                let point = createPoint(BMap, { lng: center.lng, lat: val });
                originInstance.setCenter(point);
            }
        },
        radius(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setRadius(val);
            }
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
        strokeOpacity(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setStrokeOpacity(val);
            }
        },
        fillOpacity(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setFillOpacity(val);
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
                center,
                radius,
                strokeColor,
                fillColor,
                strokeWeight,
                strokeOpacity,
                fillOpacity,
                strokeStyle,
                massClear,
                editing,
                clicking
            } = this;
            const { BMap, map } = $parent;
            this.BMap = BMap;
            this.map = map;
            let point = createPoint(BMap, center);

            let overlay = new BMap.Circle(point, radius, {
                strokeColor,
                fillColor,
                strokeWeight,
                strokeOpacity,
                fillOpacity,
                strokeStyle,
                massClear,
                editing,
                clicking
            }); //创建圆

            this.originInstance = overlay;
            bindEvents.call(this, overlay);
            map.addOverlay(overlay);
        },
        ready() {
            this.load();
        }
    }
};
</script>
