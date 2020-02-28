<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-polygon
            :path="rectangle"
            :strokeColor="color"
            fillColor="yellow"
            :fillOpacity="0.5"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
            :dragging="true"
            :diting="true"
            :clicking="true"
        />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BaiduMapPolygon from '@/components/baidu-map/overlays/polygon'; //多边形覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-polygon': BaiduMapPolygon
    },
    data() {
        return {
            center: { lng: 113.897751, lat: 26.405797 },
            zoom: 10,
            rectangle: [
                { lng: 113.897751, lat: 26.405797 },
                { lng: 114.599148, lat: 26.405797 },
                { lng: 114.599148, lat: 26.150782 },
                { lng: 113.897751, lat: 26.150782 }
            ],
            color: 'red'
        };
    },
    computed: {},
    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
