<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :center="mapConfig.center"
            :zoom="mapConfig.zoom"
            :dragging="mapConfig.dragging"
            @ready="mapReady"
            @mousedown="mapMouseDown"
            @mousemove="mapMouseMove"
            @mouseup="mapMouseUp"
            @rightclick="mapRightClick"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                <bm-drawing-manager
                    ref="drawingManager"
                    :map="map"
                    :BMap="BMap"
                    :drawingType="mapConfig.drawingType"
                    :default-drawing="mapConfig.defaultDrawing"
                    :show-tips="true"
                    @click="drawingClick"
                    @circlecomplete="circleComplete"
                    @rectanglecomplete="rectangleComplete"
                    @polygoncomplete="polygonComplete"
                    @polylinecomplete="polylineComplete"
                    @drawingcomplete="drawingComplete"
                ></bm-drawing-manager>
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义版权控制层
import BuiduDrawingManager from '@/components/baidu-map/tools/drawing-manager/drawing-manager'; //图形绘制工具

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-drawing-manager': BuiduDrawingManager
    },
    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 108.640996, lat: 19.065555 },
                zoom: 16,
                dragging: true,
                drawingType: 'circle', //'polygon', 'rectangle', 'polyline'
                defaultDrawing : {
                    center: { lng: 108.640996, lat: 19.065555 },
                    radius: 500,
                    path: [{"lng":108.638571,"lat":19.071193},{"lng":108.646979,"lat":19.071193},{"lng":108.646979,"lat":19.067571},{"lng":108.638571,"lat":19.067571}]
                }
            }
        };
    },
    watch: {},
    beforeDestroy() {
        this.map.removeEventListener('mousedown', this.mapMouseDown);
        this.map.removeEventListener('mousemove', this.mapMouseMove);
        this.map.removeEventListener('mouseup', this.mapMouseUp);
        this.map.removeEventListener('rightclick', this.exitDrawing);
    },

    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;
        },
        mapMouseDown(e) {
            this.$refs.drawingManager.mapMouseDown(e);
        },
        mapMouseMove(e) {
            this.$refs.drawingManager.mapMouseMove(e);
        },

        mapMouseUp(e) {
            this.$refs.drawingManager.mapMouseUp(e);
        },
        mapRightClick() {
            this.$refs.drawingManager.mapRightClick();
        },
        drawingClick(type) {
            //this.mapConfig.dragging = (type === 'hander');
        },
        
        circleComplete(data) {
            console.log(data);
        },
        rectangleComplete(data) {
            console.log(data);
        },
        polygonComplete(data) {
            console.log(data);
        },
        polylineComplete(data) {
            console.log(data);
        },
        drawingComplete(data) {
            console.log(JSON.stringify(data));
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
