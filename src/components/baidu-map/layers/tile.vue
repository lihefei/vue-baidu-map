<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-tile',
    mixins: [commonMixin('layer')],
    props: {
        transparentPng: {
            type: Boolean,
            default: true,
        },
        tileUrlTemplate: String,
        copyright: Object,
        zIndex: Number,
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
        },
    },
    methods: {
        load() {
            const {
                BMap,
                map,
                transparentPng,
                tileUrlTemplate,
                copyright,
                zIndex,
            } = this;

            this.originInstance = new BMap.TileLayer({
                transparentPng,
                copyright: copyright && {
                    id: copyright.id,
                    content: copyright.content,
                    bounds:
                        copyright.bounds &&
                        createBounds(BMap, copyright.bounds),
                },
                zIndex,
            });

            this.originInstance.getTilesUrl = function (tileCoord, zoom) {
                let x = tileCoord.x,
                    y = tileCoord.y,
                    z = zoom,
                    url = tileUrlTemplate
                        .replace('{X}', x)
                        .replace('{Y}', y)
                        .replace('{Z}', z);
                return url;
            };

            map.addTileLayer(this.originInstance);
        },
    },
    render() {},
};
</script>
