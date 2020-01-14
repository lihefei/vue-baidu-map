<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-context-menu @open="open" @close="close">
            <bm-context-menu-item text="放大" :callback="zoomOut"></bm-context-menu-item>
            <bm-context-menu-item seperator></bm-context-menu-item>
            <bm-context-menu-item text="缩小" :callback="zoomOut"></bm-context-menu-item>
            <bm-context-menu-item seperator></bm-context-menu-item>
            <bm-context-menu-item text="其他"></bm-context-menu-item>
        </bm-context-menu>

        <bm-marker :position="center" :dragging="true">
            <bm-context-menu>
                <bm-context-menu-item text="标记里的菜单"></bm-context-menu-item>
            </bm-context-menu>
        </bm-marker>
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduContextMenu from '@/components/baidu-map/context-menu/menu'; //菜单
import BuiduContextMenuItem from '@/components/baidu-map/context-menu/item'; //菜单项
import BuiduMapMarker from '@/components/baidu-map/overlays/marker'; //marker标记

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-context-menu': BuiduContextMenu,
        'bm-context-menu-item': BuiduContextMenuItem,
        'bm-marker': BuiduMapMarker
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
        zoomOut() {
            this.map.zoomOut();
        },
        zoomIn() {
            this.map.zoomIn();
        },
        open(e) {
            console.log(e);
        },
        close(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>

