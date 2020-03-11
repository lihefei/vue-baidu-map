<template>
    <bm-tool-wrapper v-if="map" :map="map" :BMap="BMap">
        
        <div class="drawing-manager">
            <bm-drawing-icon
                v-for="(type, index) in drawingTypes"
                :type="type"
                :index="index"
                :class="{active: type === mapConfig.drawingType}"
                @click="switchTypeClick"
            ></bm-drawing-icon>
            <span class="drawing-tips" v-if="showTips">{{tipsText[mapConfig.drawingType]}}</span>
        </div>
        <bm-circle
            ref="circle"
            :center="mapConfig.circle.center"
            :radius="mapConfig.circle.radius"
            strokeColor="red"
            fillColor="rgba(255,255,255, .5)"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            :fillOpacity="0.8"
            strokeStyle="solid"
            :massClear="true"
            :dragging="true"
            :diting="true"
            :clicking="true"
        />
        <bm-polyline
            ref="polyline"
            :path="mapConfig.polyline.path"
            strokeColor="red"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
            :diting="true"
            :clicking="true"
        />

        <bm-polygon
            ref="polygon"
            :path="mapConfig.polygon.path"
            strokeColor="red"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
        />

        <bm-polygon
            ref="rectangle"
            :path="mapConfig.rectangle.path"
            strokeColor="red"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
        />
    </bm-tool-wrapper>
</template>
<script>
import BaiduToolWrapper from '../tool-wrapper'; //工具包装器
import BuiduDrawingIcon from './drawing-icon'; //图形绘制工具
import BaiduMapPolyline from '../../overlays/polyline'; //线条覆盖物
import BaiduMapCircle from '../../overlays/circle'; //圆型覆盖物
import BaiduMapPolygon from '../../overlays/polygon'; //多边形覆盖物

export default {
    name: 'bm-drawing-manager',
    components: {
        'bm-tool-wrapper': BaiduToolWrapper,
        'bm-drawing-icon': BuiduDrawingIcon,
        'bm-circle': BaiduMapCircle,
        'bm-polyline': BaiduMapPolyline,
        'bm-polygon': BaiduMapPolygon
    },
    props: {
        map: Object,
        BMap: Object,
        drawingType: {
            type: String,
            default: 'hander'
        },
        drawingTypes: {
            type: Array,
            default() {
                return ['hander', 'circle', 'polygon', 'rectangle', 'polyline'];
            }
        },
        defaultDrawing: Object,
        showTips: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            mapConfig: {
                map: null,
                BMap: null,
                drawing: false, //绘制状态
                drawingType: 'hander', //绘制类型
                continuousDrawing: false, //连续绘制状态
                polyline: {
                    path: []
                },
                polygon: {
                    path: []
                },
                rectangle: {
                    path: []
                },
                circle: {
                    center: { lng: 0, lat: 0 },
                    radius: 0
                }
            },
            tipsText: {
                hander: '选择绘制图标，在地图上开始绘制',
                circle: '按住鼠标拖动，松开完成绘制',
                polyline: '单击鼠标连点，右键完成绘制',
                rectangle: '按住鼠标拖动，松开完鼠标成绘制',
                polygon: '单击鼠标连点，右键完成绘制'
            }
        };
    },
    watch: {
        map(map) {
            this.mapConfig.map = map;
            let drawingMode = this.mapConfig.drawingType;
            map && this.setMapCursor(this.mapConfig.drawingType);
            this.enableMapDragging(map && drawingMode === 'hander');
        },
        BMap(BMap) {
            this.mapConfig.BMap = BMap;
        },
        drawingType(val) {
            this.mapConfig.drawingType = val;
            this.switchTypeClick(val);
            
        },
        'mapConfig.drawingType': function(val) {
            if (this.mapConfig.map) {
                this.enableMapDragging(val === 'hander');
            }
            
        }
    },
    created() {
        this.mapConfig.BMap = this.BMap;
        this.mapConfig.map = this.map;
        this.mapConfig.drawingType = this.drawingType;
        this.map && this.setMapCursor(this.drawingType)
         if (this.drawingType !== 'hander' && this.defaultDrawing) {
             let drawingMode =  this.drawingType; 
             let data = JSON.parse(JSON.stringify(this.defaultDrawing));
             Object.assign(this.mapConfig[drawingMode], data);
         }
    },
    beforeDestroy() {
        this.setMapCursor('hander');
        this.enableMapDragging(true);
    },
    methods: {
        /**
         * 切换绘制工具
         * @param {Number} type 绘制工具类型
         */
        switchTypeClick(type) {
            
            this.mapConfig.drawingType = type;
            this.setMapCursor(type);

            this.mapConfig.continuousDrawing = false; //取消连续绘制状态

            if (type !== 'hander') {
                this.resetDrawingData(); //重置绘制数据             
                //console.log('开启' + type + '绘制模式');
            } else {
                this.mapConfig.drawing = false;
                this.mapConfig.continuousDrawing = false; //取消连续绘制
            }

            this.$emit('click',type );
        },
        /**
         * 设置地图鼠标样式
         * @param {Number} type 绘制工具类型
         */
        setMapCursor(type) {
            let cursor = 'crosshair'; //鼠标十字绘制样式

            //如果是抓手模式
            if (type === 'hander') {
                cursor =
                    'url(https://api.map.baidu.com/images/openhand.cur) 8 8,default';
            }

            this.mapConfig.map.setDefaultCursor(cursor);
        },
        /**
         * 重置绘制数据
         */
        resetDrawingData() {
            this.mapConfig.circle.radius = 0;
            this.mapConfig.circle.center = null;
            this.mapConfig.polygon.path = [];
            this.mapConfig.rectangle.path = [];
            this.mapConfig.polyline.path = [];
        },
        /**
         * 退出绘制状态
         */
        exitDrawing() {
            let drawingMode = this.mapConfig.drawingType;

            this.$emit('drawingcomplete', {
                drawingType: drawingMode,
                ...this.mapConfig[drawingMode]
            });

            this.mapConfig.drawing = false;
            this.mapConfig.continuousDrawing = false; //取消连续绘制

            //console.log('退出绘制模式');
        },
        /**
         * 获取矩形路径
         * @param {Object} start 西北角坐标
         * @param {Object} end 东南角坐标
         */
        getRectanglePath(start, end) {

            let rectanglePoints = [];
            
            if (start && end) {
                rectanglePoints = [
                    { ...start },
                    { lng: end.lng, lat: start.lat },
                    { ...end },
                    { lng: start.lng, lat: end.lat }
                ];
            }

            return rectanglePoints;
        }, 
        /**
         * 地图上鼠标键按下
         */
        mapMouseDown(e) {
            let drawingMode = this.mapConfig.drawingType;

            if (drawingMode !== 'hander') {
                this.mapConfig.drawing = true;
                //console.log('进入' + drawingMode + '绘制模式');

                if (drawingMode === 'circle') {
                    this.mapConfig.circle.center = null;
                    this.mapConfig.circle.center = e.point;
                } else if (drawingMode === 'rectangle') {
                    this.mapConfig[drawingMode].path[0] =
                        e.point;
                } else {
                    if (!this.mapConfig.continuousDrawing) {
                        this.mapConfig[drawingMode].path = [];
                    }
                }
            }
        },
        /**
         * 地图上鼠标移动
         */
        mapMouseMove(e) {
            if (this.mapConfig.drawing) {
                let drawingMode = this.mapConfig.drawingType;

                if (drawingMode === 'circle') {
                    this.mapConfig[drawingMode].radius = this.mapConfig.map.getDistance(
                        this.mapConfig[drawingMode].center,
                        e.point
                    );
                } else if (drawingMode === 'rectangle') {
                    let path =  this.getRectanglePath(
                        this.mapConfig[drawingMode].path[0],
                        e.point
                    );
                    this.mapConfig[drawingMode].path = path;

                } else {
                    let path = this.mapConfig[drawingMode].path;
                    let len = path.length;
                    if (len === 1) {
                        path.push(e.point);
                    } else {
                        let index = path.length - 1;
                        path.splice(index, 1, e.point);
                    }
                }
            }
        },
        /**
         * 地图上鼠标按键松开弹起
         */
        mapMouseUp(e) {
            if (this.mapConfig.drawing) {
                let drawingMode = this.mapConfig.drawingType;

                if (drawingMode === 'circle' || drawingMode === 'rectangle') {

                    if (drawingMode === 'rectangle') {
                        let path = this.getRectanglePath(
                            this.mapConfig[drawingMode].path[0],
                            e.point
                        );
                        this.mapConfig[drawingMode].path = path;
                    } 

                    //console.log('结束' + drawingMode + '绘制模式');
                    this.$emit(drawingMode + 'complete', this.mapConfig[drawingMode]);
                    this.exitDrawing();

                } else {
                    //console.log('持续' + drawingMode + '绘制模式');
                    this.mapConfig[drawingMode].path.push(e.point);
                    this.mapConfig.continuousDrawing = true; //多边形和线段模式下，鼠标左键松开弹起后可以继续绘制
                }
            }
        },
        /**
         * 地图上鼠标右击
         */
        mapRightClick() {
            let drawingMode = this.mapConfig.drawingType;

            if (drawingMode === 'polygon' || drawingMode === 'polyline') {
                    this.$emit(drawingMode + 'complete', this.mapConfig[drawingMode]);
                    this.exitDrawing();
                }
            
        },

        /**
         * 激活地图拖拽
         * @param {Boolean} flag 状态
         */
        enableMapDragging(flag = true) {
            let map = this.mapConfig.map;
            flag ? map.enableDragging() : map.disableDragging(); 
        }
    }
};
</script>
<style lang="scss" scoped>
.drawing-manager {
    &,
    * {
        box-sizing: border-box;
    }
    display: flex;
    justify-content: space-between;
    position: relative;

    .drawing-tips {
        position: absolute;
        left: 0;
        top: 110%;
        width: 100%;
        padding: 4px 8px;
        border-radius: 2px;
        color: #666;
        font-size: 12px;
        background-color: #fbf6c2;
    }
}
</style>
