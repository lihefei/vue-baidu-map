<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createSize } from '../base/factory';
export default {
    name: 'bm-overview-map',
    mixins: [commonMixin('control')],
    props: {
        anchor: String,
        offset: Object,
        size: Object,
        isOpen: Boolean
    },
    watch: {
        anchor() {
            this.reload();
        },
        offset() {
            this.reload();
        },
        size(val) {
            this.originInstance.setSize(createSize(this.BMap, val));
        },
        isOpen() {
            this.originInstance.changeView();
        }
    },
    methods: {
        load() {
            const { BMap, map, anchor, offset, size, isOpen } = this;

            this.originInstance = new BMap.OverviewMapControl({
                anchor: global[anchor],
                offset: size && createSize(BMap, offset),
                size: size && createSize(BMap, size),
                isOpen
            });
            bindEvents.call(this, this.originInstance);
            map.addControl(this.originInstance);
        }
    },
    render() {}
};
</script>
