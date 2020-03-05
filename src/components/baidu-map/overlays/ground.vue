<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createPoint, createBounds } from '../base/factory';
export default {
    name: 'bm-ground',
    render() {},
    mixins: [commonMixin('overlay')],
    props: {
        bounds: {},
        opacity: Number,
        imageURL: String,
        displayOnMinLevel: Number,
        displayOnMaxLeve: Number
    },
    watch: {
        bounds: {
            handler(val) {
                const { BMap } = this;
                this.originInstance.setBounds(createBounds(BMap, val));
            },
            deep: true
        },
        opacity(val) {
            this.originInstance.setOpacity(val);
        },
        imageURL(val) {
            this.originInstance.setImageURL(val);
        },
        displayOnMinLevel(val) {
            this.originInstance.setDisplayOnMinLevel(val);
        },
        displayOnMaxLevel(val) {
            this.originInstance.setDisplayOnMaxLevel(val);
        }
    },
    mounted() {},
    methods: {
        load() {
            const {
                $parent,
                bounds,
                opacity,
                imageURL,
                displayOnMinLevel,
                displayOnMaxLeve
            } = this;

            const { BMap, map } = $parent;
            this.BMap = BMap;
            this.map = map;

            let overlay = new BMap.GroundOverlay(createBounds(BMap, bounds), {
                opacity,
                imageURL,
                displayOnMinLevel,
                displayOnMaxLeve
            }); // 创建地面图层

            this.originInstance = overlay;
            bindEvents.call(this, overlay);
            map.addOverlay(overlay);
        }
    }
};
</script>
