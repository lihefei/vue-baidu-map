<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :center="center"
            :zoom="zoom"
            @ready="mapReady"
            @click="clickMap"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                <bm-drawing-manager selected="circle"></bm-drawing-manager>
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义版权控制层
import BuiduDrawingManager from '@/components/baidu-map/tools/drawing-manager'; //图形绘制工具

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        //'bm-circle': BuiduMapCircle,
        //'bm-polyline': BuiduMapPolyline,
        //'bm-polygon': BuiduMapPolygon,
        'bm-control': BuiduControl,
        'bm-drawing-manager': BuiduDrawingManager
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16
        };
    },

    methods: {
        mapReady(BMap, map) {
            console.log(BMap, map);
        },
        clickMap(e) {
            console.log(this);
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
