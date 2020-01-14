<template>
    <div v-if="map">
        <bm-drawing-icon :type="type" :draws="draws" @click="click"></bm-drawing-icon>

        <bm-polyline
            ref="polyline"
            v-show="polyline.path.length"
            :path="polyline.path"
            strokeColor="red"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
            :diting="true"
            :clicking="true"
        />

        <bm-circle
            ref="circle"
            v-show="circle.center"
            :center="circle.center"
            :radius="circle.radius"
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

        <bm-polygon
            ref="polygon"
            v-show="polygon.path.length"
            :path="polygon.path"
            strokeColor="red"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
            :diting="true"
            :clicking="true"
        />

        <bm-polygon
            ref="rectangle"
            v-show="rectangle.path.length"
            :path="rectangle.path"
            strokeColor="red"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
            :diting="true"
            :clicking="true"
        />
    </div>
</template>
<script>
import BuiduDrawingIcon from './drawing-icon'; //图形绘制工具
import BuiduMapPolyline from '@/components/baidu-map/overlays/polyline'; //线条覆盖物
import BuiduMapCircle from '@/components/baidu-map/overlays/circle'; //圆型覆盖物
import BuiduMapPolygon from '@/components/baidu-map/overlays/polygon'; //多边形覆盖物

export default {
    name: 'drawing-manager',
    components: {
        'bm-drawing-icon': BuiduDrawingIcon,
        'bm-circle': BuiduMapCircle,
        'bm-polyline': BuiduMapPolyline,
        'bm-polygon': BuiduMapPolygon
    },
    props: {
        BMap: Object,
        map: Object,
        type: String,
        draws: Array
    },
    data() {
        return {
            editing: false,
            restart: true,
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
        };
    },

    watch: {
        BMap() {
            this.setCursor(this.type);
        },
        type(val) {
            this.setCursor(val);
        }
    },
    methods: {
        click(type) {
            this.restart = true;

            if (type !== 'hander') {
                this.reset();
                console.log('开启' + type + '绘制模式');
            } else {
                this.exitDraw();
            }

            this.$emit('click', type);
        },
        mouseDown(e) {
            if (this.type !== 'hander') {
                this.editing = true;

                console.log('按下地图');

                if (this.type === 'circle') {
                    this.circle.center = null;
                    this.circle.center = e.point;
                    console.log('确定圆心');
                } else if (this.type === 'rectangle') {
                    this[this.type].path[0] = e.point;
                } else {
                    if (this.restart) {
                        this[this.type].path = [];
                    }
                }
            }
        },
        mouseMove(e) {
            if (this.editing) {
                if (this.type === 'circle') {
                    this.circle.radius = this.map.getDistance(
                        this.circle.center,
                        e.point
                    );
                } else if (this.type === 'rectangle') {
                    this[this.type].path = this.getRectanglePath(
                        this[this.type].path[0],
                        e.point
                    );
                } else {
                    let path = this[this.type].path;
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

        mouseUp(e) {
            if (this.editing) {
                if (this.type === 'circle') {
                    console.log('画圆结束');
                    this.exitDraw();
                } else if (this.type === 'rectangle') {
                    this[this.type].path = this.getRectanglePath(
                        this[this.type].path[0],
                        e.point
                    );
                    this.exitDraw();
                } else {
                    this[this.type].path.push(e.point);
                    this.restart = false;
                    console.log('加个点');
                }
            }
        },

        exitDraw() {
            this.editing = false;
            this.restart = true;

            this.$emit('drawcomplete', {
                circle: this.circle,
                polygon: this.polygon,
                rectangle: this.rectangle,
                polyline: this.polyline
            });

            console.log('退出编辑模式');
        },
        reset() {
            this.circle.radius = 0;
            this.circle.center = null;
            this.polygon.path = [];
            this.rectangle.path = [];
            this.polyline.path = [];
        },
        setCursor(type) {
            let cursor =
                type === 'hander'
                    ? 'url(https://api.map.baidu.com/images/openhand.cur) 8 8,default'
                    : 'crosshair';
            this.map.setDefaultCursor(cursor);
        },

        getRectanglePath(start, end) {
            if (start && end) {
                return [
                    { ...start },
                    { lng: end.lng, lat: start.lat },
                    { ...end },
                    { lng: start.lng, lat: end.lat }
                ];
            }

            return [];
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
