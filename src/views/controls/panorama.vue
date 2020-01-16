<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-panorama />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduPanorama from '@/components/baidu-map/controls/panorama'; //街景控制层

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-panorama': BuiduPanorama
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16
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
