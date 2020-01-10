<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createPoint } from '../base/factory';
export default {
    name: 'bm-label',
    render() {},
    mixins: [commonMixin('overlay')],
    props: {
        content: String,
        position: {},
        offset: {},
        massClear: Boolean,
        title: String,
        zIndex: Number,
        labelStyle: {}
    },
    watch: {
        setContent(val, oldVal) {
            if (val !== oldVal) {
                this.originInstance.setContent(val);
            }
        },
        'position.lng': function(val, oldVal) {
            const { BMap, position, originInstance } = this;
            if (val !== oldVal && val >= -180 && val <= 180) {
                let point = createPoint(BMap, { lng: val, lat: position.lat });
                originInstance.setPosition(point);
            }
        },
        'position.lat': function(val, oldVal) {
            const { BMap, position, originInstance } = this;
            if (val !== oldVal && val >= -90 && val <= 90) {
                let point = createPoint(BMap, { lng: position.lng, lat: val });
                originInstance.setPosition(point);
            }
        },
        'offset.width': function(val, oldVal) {
            const { BMap, offset, originInstance } = this;
            if (val !== oldVal) {
                let size = createSize(BMap, { width: val, lat: offset.height });
                originInstance.setOffset(size);
            }
        },
        'offset.height': function(val, oldVal) {
            const { BMap, offset, originInstance } = this;
            if (val !== oldVal) {
                let size = createSize(BMap, {
                    width: offset.width,
                    height: val
                });
                originInstance.setOffset(size);
            }
        },
        setTitle(val, oldVal) {
            if (val !== oldVal) {
                this.originInstance.setTitle(val);
            }
        },
        setZIndex(val, oldVal) {
            if (val !== oldVal) {
                this.originInstance.setZIndex(val);
            }
        },
        labelStyle: {
            handler(val) {
                this.originInstance.setStyle(val);
            },
            deep: true
        },
        massClear(val) {
            val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
        }
    },
    mounted() {},
    methods: {
        load() {
            const { $parent, content, position, offset, labelStyle, massClear } = this;

            const { BMap, map } = $parent;

            let overlay = new BMap.Label(content, {
                position: createPoint(BMap, position),
                offset
            }); // 创建文本标注对象

            overlay.setStyle(labelStyle);

            this.originInstance = overlay;
            bindEvents.call(this, overlay);
            map.addOverlay(overlay);
        }
    }
};
</script>
