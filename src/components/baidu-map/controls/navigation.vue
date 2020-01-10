<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-navigation',
    mixins: [commonMixin('control')],
    props: {
        offset: Object,
        anchor: String,
        type: String,
        showZoomInf: Boolean,
        enableGeolocation: {
            type: Boolean,
            default: false
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
        showZoomInf() {
            this.reload();
        }
    },
    methods: {
        load() {
            const { BMap, map, anchor, type, offset, showZoomInf, enableGeolocation } = this;

            this.originInstance = new BMap.NavigationControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset),
                type: global[type],
                showZoomInf,
                enableGeolocation
            }); 

            map.addControl(this.originInstance);
        }
    },
    render() {}
};
</script>
