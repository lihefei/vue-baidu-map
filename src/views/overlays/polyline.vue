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
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
            :dragging="true"
            :diting="true"
            :clicking="true"
            @click="clickMap"
        />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduMapPolyline from '@/components/baidu-map/overlays/polyline'; //线条覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-polyline': BuiduMapPolyline
    },
    data() {
        return {
            center: { lng: 114.245, lat: 26.325 },
            zoom: 10,
            path: [
                { lng: 114.245, lat: 26.325 },
                { lng: 114.285, lat: 26.885 },
                { lng: 114.665, lat: 26.885 },
                { lng: 114.665, lat: 26.085 }
            ],
            color: 'red'
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
