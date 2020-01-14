<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-context-menu>
            <bm-context-menu-item
                text="去北京"
                :callback="gotoBeijing"
                iconUrl="http://lbsyun.baidu.com/skins/MySkin/resources/img/red.png"
            />
        </bm-context-menu>
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduContextMenu from '@/components/baidu-map/context-menu/menu'; //菜单
import BuiduContextMenuItem from '@/components/baidu-map/context-menu/item'; //菜单项

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-context-menu': BuiduContextMenu,
        'bm-context-menu-item': BuiduContextMenuItem
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16
        };
    },

    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
            this.BMap = BMap;
            this.map = map;
        },
        gotoBeijing(e) {
            this.center = {
                lng: 116.404,
                lat: 39.915
            };
        }
    }
};
</script>
<style lang="scss" scoped>
</style>

