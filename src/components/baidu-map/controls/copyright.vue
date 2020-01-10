<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createSize, createBounds } from '../base/factory';
export default {
    name: 'bm-copyright',
    mixins: [commonMixin('control')],
    props: {
        anchor: String,
        offset: Object,
        copyrights: Array
    },
    watch: {
        anchor() {
            this.reload();
        },
        offset() {
            this.reload();
        },
        copyrights() {
            this.reload();
        }
    },
    methods: {
        load() {
            const { BMap, map, anchor, offset, updateCopyrightList } = this;

            this.originInstance = new BMap.CopyrightControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset)
            });

            updateCopyrightList();
            map.addControl(this.originInstance);
        },
        updateCopyrightList() {
            let { BMap, map, copyrights, addCopyright, getCopyright, originInstance } = this;

            let { removeCopyright, getCopyrightCollection } = originInstance;

            let copyrigthList = getCopyrightCollection();

            copyrigthList &&
                copyrigthList.forEach(item => {
                    removeCopyright(item.id);
                });

            copyrights &&
                copyrights.forEach(item => {
                    const bounds = item.bounds ? createBounds(BMap, item.bounds) : map.getBounds();

                    originInstance.addCopyright({
                        id: item.id,
                        content: item.content,
                        bounds
                    });
                });
        }
    },
    render() {}
};
</script>
