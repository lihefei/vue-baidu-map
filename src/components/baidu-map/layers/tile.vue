<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-tile',
    mixins: [commonMixin('layer')],
    props: {
        transparentPng: {
            type: Boolean,
            default: true
        },
        tileUrlTemplate: String,
        copyright: Object,
        zIndex: Number
    },
    watch: {
        transparentPng() {
            this.reload();
        },
        tileUrlTemplate() {
            this.reload();
        },
        copyright() {
            this.reload();
        },
        zIndex() {
            this.reload();
        }
    },
    methods: {
        load() {
            const { BMap, map, transparentPng, tileUrlTemplate, copyright, zIndex } = this;

            this.originInstance = new BMap.TileLayer({
                transparentPng,
                tileUrlTemplate,
                copyright: copyright && {
                    id: copyright.id,
                    content: copyright.content,
                    bounds: copyright.bounds && createBounds(BMap, copyright.bounds)
                },
                zIndex
            });

            map.addTileLayer(this.originInstance);
        }
    },
    render() {}
};
</script>
