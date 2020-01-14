<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
export default {
    name: 'bm-context-menu',
    mixins: [commonMixin('contextMenu')],
    props: {
        width: Number
    },
    methods: {
        load() {
            const { BMap, map, $parent, width } = this;
            const parent = (this.parent = $parent.originInstance || map);
            if (this.originInstance) {
                parent.removeContextMenu(this.originInstance);
            }
            const menu = (this.originInstance = new BMap.ContextMenu());

            for (const item of this.$children) {
                if (item.seperator) {
                    menu.addSeparator();
                    continue;
                }
                const menuItem = new BMap.MenuItem(
                    item.text,
                    function(point, pixel) {
                        item.callback({
                            point,
                            pixel,
                            BMap,
                            map,
                            target: parent
                        });
                    },
                    {
                        width,
                        id: item.id,
                        iconUrl: item.iconUrl
                    }
                );
                item.disabled ? menuItem.disable() : menuItem.enable();
                item.originInstance = menuItem;
                menu.addItem(menuItem);
            }
            bindEvents.call(this, menu);
            parent.addContextMenu(menu);
        }
    }
};
</script>
