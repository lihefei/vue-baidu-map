<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-polyline
            :path="path"
            :strokeColor="color"
            :strokeWeight="6"
            :strokeOpacity="0.8"
            strokeStyle="solid"
            :massClear="true"
            :dragging="true"
            :diting="true"
            :clicking="true"
        />

        <bm-polyline
            :path="path2"
            strokeColor="blue"
            :strokeWeight="10"
            :strokeOpacity="0.8"
            strokeStyle="solid"
            :massClear="true"
            :dragging="true"
            :diting="true"
            :clicking="true"
            :icons="icons"
        />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BaiduMapPolyline from '@/components/baidu-map/overlays/polyline'; //线条覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-polyline': BaiduMapPolyline,
    },
    data() {
        return {
            center: { lng: 116.403, lat: 39.913 },
            zoom: 12,
            path: [
                { lng: 116.315157, lat: 39.967378 },
                { lng: 116.330105, lat: 39.972686 },
                { lng: 116.439339, lat: 39.975783 },
                { lng: 116.468084, lat: 39.95853 },
                { lng: 116.468084, lat: 39.874856 },
                { lng: 116.454861, lat: 39.86511 },
                { lng: 116.379547, lat: 39.862895 },
                { lng: 116.338153, lat: 39.854476 },
                { lng: 116.319756, lat: 39.868654 },
                { lng: 116.316882, lat: 39.947468 },
            ],
            path2: [
                { lng: 116.229494, lat: 39.99878 },
                { lng: 116.334704, lat: 40.027516 },
                { lng: 116.442213, lat: 40.0284 },
                { lng: 116.49568, lat: 40.017349 },
                { lng: 116.547998, lat: 39.9478 },
                { lng: 116.554897, lat: 39.853479 },
                { lng: 116.483032, lat: 39.812256 },
                { lng: 116.466935, lat: 39.796735 },
                { lng: 116.437039, lat: 39.791856 },
                { lng: 116.424391, lat: 39.773226 },
                { lng: 116.387021, lat: 39.763908 },
                { lng: 116.377248, lat: 39.781654 },
                { lng: 116.31027, lat: 39.787754 },
                { lng: 116.289573, lat: 39.780324 },
                { lng: 116.251054, lat: 39.837303 },
                { lng: 116.251054, lat: 39.837303 },
                { lng: 116.224608, lat: 39.964392 },
            ],
            color: 'red',
            icons: [
                {
                    symbol: {
                        shape: 'BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW',
                        options: {
                            scale: 0.6,
                            strokeColor: '#fff',
                            strokeWeight: '2',
                        },
                    },
                    offset: '10px', //符号相对于线起点的位置
                    repeat: '40px', //重复显示的距离, 同时设置repeat与offset时，以repeat为准;
                    fixedRotation: false, //固定图标旋转角度
                },
            ],
        };
    },
    computed: {},
    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        },
    },
};
</script>
<style lang="scss" scoped></style>
