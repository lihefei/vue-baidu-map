<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createPoint } from '../base/factory';
export default {
    name: 'bm-polyline',
    render() {},
    mixins: [commonMixin('overlay')],
    props: {
        path: Array,
        strokeColor: String,
        strokeWeight: Number,
        strokeOpacity: Number,
        strokeStyle: String,
        massClear: Boolean,
        editing: Boolean,
        clicking: Boolean,
        icons: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    watch: {
        path: {
            handler(val, oldVal) {
                this.reload();
            },
            deep: true,
        },
        strokeColor(val, oldVal) {
            const { originInstance } = this;
            if (val !== oldVal) {
                originInstance.setStrokeColor(val);
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
        },
        icons: {
            handler(val, oldVal) {
                this.reload();
            },
            deep: true,
        },
    },
    mounted() {},
    methods: {
        load() {
            const {
                $parent,
                path,
                strokeColor,
                strokeWeight,
                strokeOpacity,
                strokeStyle,
                massClear,
                editing,
                clicking,
                icons,
            } = this;

            const { BMap, map } = $parent;
            this.BMap = BMap;
            this.map = map;
            let pathPoint = path.map((p) => createPoint(BMap, p));
            let options = {
                strokeColor,
                strokeWeight,
                strokeOpacity,
                strokeStyle,
                massClear,
                editing,
                clicking,
            };
            if (icons.length) {
                options.icons = icons.map((icon) => {
                    let sy = new BMap.Symbol(
                        window[icon.symbol.shape],
                        icon.symbol.options
                    );
                    return new BMap.IconSequence(
                        sy,
                        icon.offset,
                        icon.repeat,
                        icon.fixedRotation
                    );
                });
            }

            let overlay = new BMap.Polyline(pathPoint, options); //创建线条

            this.originInstance = overlay;
            bindEvents.call(this, overlay);
            map.addOverlay(overlay);
        },
    },
};
</script>
