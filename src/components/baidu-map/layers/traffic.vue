<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-traffic',
    mixins: [commonMixin('layer')],
    props: {
        predictDate: Object
    },
    watch: {
        predictDate: {
            handler(val) {
                this.reload();
            },
            deep: true
        }
    },
    methods: {
        load() {
            const { BMap, map, predictDate } = this;

            this.originInstance = new BMap.TrafficLayer({
                predictDate
            });

            map.addTileLayer(this.originInstance);
        }
    },
    render() {}
};
</script>
