<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
        @zoomend="zoomend"
        @click="clickMap"
    ></baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图

export default {
    name: 'baiduMap',
    components: {
        'baidu-map': BaiduMap
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },

            zoom: 16
        };
    },

    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        },
        clickMap(e) {
            console.log(e);
        },
        zoomend(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>

