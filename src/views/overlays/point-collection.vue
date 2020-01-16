<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-point-collection
            :points="points"
            shape="BMAP_POINT_SHAPE_STAR"
            size="BMAP_POINT_SIZE_BIG"
            color="red"
        />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduPointCollection from '@/components/baidu-map/overlays/point-collection'; //海量点覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-point-collection': BuiduPointCollection
    },
    data() {
        return {
            center: { lng: 113.827611, lat: 26.219256 },
            zoom: 8,
            points: [
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
<style lang="scss" scoped></style>
