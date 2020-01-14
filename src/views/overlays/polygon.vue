<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-polygon
            :path="polygon"
            :strokeColor="color"
            fillColor="blue"
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
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduMapPolygon from '@/components/baidu-map/overlays/polygon'; //多边形覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-polygon': BuiduMapPolygon
    },
    data() {
        return {
            center: { lng: 113.827611, lat: 26.219256 },
            zoom: 10,
            color: 'red',
            polygon: [
                { lng: 113.827611, lat: 26.219256 },
                { lng: 114.356534, lat: 26.691235 },
                { lng: 114.710682, lat: 26.28769 },
                { lng: 114.393328, lat: 25.920161 },
                { lng: 113.990887, lat: 26.019945 }
            ]
        };
    },
    computed: {},
    methods: {
        mapReady(BMap, map) {
            console.log(BMap, map);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
