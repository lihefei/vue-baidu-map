<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :center="mapCfg.center"
            :zoom="mapCfg.zoom"
            :dragging="mapCfg.dragging"
            @ready="mapReady"
            @mousedown="mouseDown"
            @mousemove="mouseMove"
            @mouseup="mouseUp"
            @rightclick="exitDraw"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                <bm-drawing-manager
                    ref="drawingManager"
                    :map="map"
                    :BMap="BMap"
                    :type="drawType"
                    @click="drawClick"
                    @drawcomplete="drawComplete"
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
            mapCfg: {
                center: { lng: 108.640996, lat: 19.065555 },
                zoom: 16,
                dragging: true
            },
            drawType: 'circle',
            map: null,
            BMap: null
        };
    },
    watch: {},
    beforeDestroy() {
        this.map.removeEventListener('mousedown', this.mouseDown);
        this.map.removeEventListener('mousemove', this.mouseMove);
        this.map.removeEventListener('mouseup', this.mouseUp);
        this.map.removeEventListener('rightclick', this.exitDraw);
    },

    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;
            this.mapCfg.dragging = this.isHander();

            console.log(BMap, map);
        },
        mouseDown(e) {
            this.$refs.drawingManager.mouseDown(e);
        },
        mouseMove(e) {
            this.$refs.drawingManager.mouseMove(e);
        },

        mouseUp(e) {
            this.$refs.drawingManager.mouseUp(e);
        },
        exitDraw() {
            this.$refs.drawingManager.exitDraw();
        },
        drawClick(type) {
            this.drawType = type;
            this.mapCfg.dragging = type === 'hander';
        },
        drawComplete(obj) {
            console.log(obj);
        },
        isHander() {
            return this.drawType === 'hander';
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
