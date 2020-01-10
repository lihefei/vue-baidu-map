<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createSize, createIcon } from '../base/factory';
export default {
    name: 'bm-geolocation',
    mixins: [commonMixin('control')],
    props: {
        anchor: String,
        offset: Object,
        showAddressBar: Boolean,
        enableAutoLocation: Boolean,
        locationIcon: Object
    },
    watch: {
        anchor() {
            this.reload();
        },
        offset() {
            this.reload();
        },

        showAddressBar() {
            this.reload();
        },
        enableAutoLocation() {
            this.reload();
        },
        enableAutoLocation() {
            this.reload();
        },
        
    },
    methods: {
        load() {
            const { BMap, map, anchor, offset, showAddressBar, enableAutoLocation, locationIcon } = this;

            this.originInstance = new BMap.GeolocationControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset),
                showAddressBar,
                enableAutoLocation,
                locationIcon: locationIcon && createIcon(BMap, locationIcon)
            });
               
            bindEvents.call(this, this.originInstance);
            map.addControl(this.originInstance);
        }
    },
    render() {}
};
</script>
