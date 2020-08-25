<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :center="mapConfig.center"
            :zoom="mapConfig.zoom"
            :dragging="mapConfig.areaSelection.drawing ? false : mapConfig.dragging"
            @ready="mapReady"
            @zoomend="mapZoom"
            @mousedown="mapMouseDown"
            @mousemove="mapMouseMove"
            @mouseup="mapMouseUp"
            @rightclick="mapMouseUp"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                <bm-tool-wrapper :map="map" :BMap="BMap">
                    <!-- 地图模式 -->
                    <bm-tool-mode v-model="mapConfig.mapMode" class="tool-item" :show-text="true" :map="map" :BMap="BMap" />
                </bm-tool-wrapper>
            </bm-control>

            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{ width: 80 }">
                <bm-tool-wrapper :map="map" :BMap="BMap">
                    <!-- 交通路况 -->
                    <bm-tool-traffic v-if="map" class="tool-item" :map="map" :BMap="BMap" />
                </bm-tool-wrapper>
            </bm-control>

            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{ width: 10, height: 100 }">
                <bm-tool-wrapper :map="map" :BMap="BMap">
                    <!-- 全屏切换 -->
                    <bm-tool-screen class="tool-item" @change="mapScreenfull($event, $refs.BDMap.$el)" />
                </bm-tool-wrapper>
            </bm-control>

            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{ width: 10, height: 60 }">
                <bm-tool-wrapper :map="map" :BMap="BMap">
                    <!-- 范围框选 -->
                    <bm-tool-range v-model="mapConfig.areaSelection.drawing" class="tool-item" />
                </bm-tool-wrapper>
            </bm-control>
            <bm-polygon
                ref="rectangle"
                :path="mapConfig.areaSelection.path"
                strokeColor="red"
                :strokeWeight="3"
                :strokeOpacity="0.5"
                strokeStyle="solid"
                :massClear="true"
            />

            <bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{ width: 80, height: 22 }">
                <!-- 当前缩放级别 -->
                <bm-level v-model="mapConfig.zoom" />
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduToolWrapper from '@/components/baidu-map/tools/tool-wrapper'; //工具包装器
import BuiduLevel from '@/components/baidu-map/tools/level'; //缩放层级数
import BuiduToolMode from '@/components/baidu-map/tools/mode'; //地图模式工具
import BuiduToolTraffic from '@/components/baidu-map/tools/traffic'; //交通路况工具
import BuiduToolScreen from '@/components/baidu-map/tools/screen'; //全屏切换
import BuiduToolRange from '@/components/baidu-map/tools/range'; //框选范围
import BaiduMapPolygon from '@/components/baidu-map/overlays/polygon'; //多边形覆盖物
import screenfull from 'screenfull'; //全屏切换
export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-tool-wrapper': BuiduToolWrapper,
        'bm-level': BuiduLevel,
        'bm-tool-mode': BuiduToolMode,
        'bm-tool-traffic': BuiduToolTraffic,
        'bm-tool-screen': BuiduToolScreen,
        'bm-tool-range': BuiduToolRange,
        'bm-polygon': BaiduMapPolygon,
    },

    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 108.946267, lat: 34.349519 },
                zoom: 7,
                mapMode: 'BMAP_NORMAL_MAP', //地图模式
                dragging: true,
                traffic: false, //交通状况
                areaSelection: {
                    drawing: false, //地图框选绘制状态
                    dragging: false, //地图框选拖拽状态
                    path: [], //地图框选路径
                },
            },
        };
    },
    watch: {
        'mapConfig.areaSelection.drawing': function(status) {
            this.setMapCursor(!status && 'hander');
        },
    },

    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;

            console.log(BMap, map);
        },
        /**
         * 全屏切换
         * @param {Boolean} isFull 是否是全屏状态
         * @param {HTMLElement} ele 全屏元素
         */
        mapScreenfull(isFull, ele) {
            if (!screenfull.isEnabled) {
                this.$message.warning('浏览器不支持全屏模式');
                return false;
            }
            if (isFull) {
                if (ele) {
                    screenfull.request(ele);
                } else {
                    screenfull.request();
                }
            } else {
                screenfull.exit();
            }
        },
        /**
         * 设置地图鼠标样式
         * @param {Number} type 绘制工具类型
         */
        setMapCursor(type) {
            let cursor = 'crosshair'; //鼠标十字绘制样式

            //如果是抓手模式
            if (type === 'hander') {
                cursor = 'url(https://api.map.baidu.com/images/openhand.cur) 8 8,default';
            }

            this.map.setDefaultCursor(cursor);
        },

        /**
         * 地图上鼠标键按下
         */
        mapMouseDown(e) {
            if (this.mapConfig.areaSelection.drawing) {
                this.mapConfig.areaSelection.path[0] = e.point;
            }
        },
        /**
         * 地图上鼠标移动
         */
        mapMouseMove(e) {
            if (this.mapConfig.areaSelection.drawing) {
                let path = this.getRectanglePath(this.mapConfig.areaSelection.path[0], e.point);
                this.mapConfig.areaSelection.path = path;
            }
        },
        /**
         * 地图上鼠标按键松开弹起
         */
        mapMouseUp(e) {
            if (this.mapConfig.areaSelection.drawing) {
                let path = this.getRectanglePath(this.mapConfig.areaSelection.path[0], e.point);
                this.mapConfig.areaSelection.path = path;

                console.log([...this.mapConfig.areaSelection.path]);

                this.mapConfig.areaSelection.path = [];

                this.exitDrawing();
            }
        },
        /**
         * 退出绘制状态
         */
        exitDrawing() {
            this.mapConfig.areaSelection.drawing = false;
            this.setMapCursor('hander');
        },

        /**
         * 获取矩形路径
         * @param {Object} start 西北角坐标
         * @param {Object} end 东南角坐标
         */
        getRectanglePath(start, end) {
            let rectanglePoints = [];

            if (start && end) {
                rectanglePoints = [{ ...start }, { lng: end.lng, lat: start.lat }, { ...end }, { lng: start.lng, lat: end.lat }];
            }

            return rectanglePoints;
        },
        /**
         * 地图Zoom改变
         */
        mapZoom(e) {
            this.mapConfig.zoom = this.map.getZoom();
        },
    },
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
    .tool-item {
        margin: 0 8px;
    }
}
</style>
