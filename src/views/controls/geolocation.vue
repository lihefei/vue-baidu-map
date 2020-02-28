<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-geolocation @locationSuccess="locationSuccess" @locationError="locationError" />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduGeolocation from '@/components/baidu-map/controls/geolocation'; //本地定位控制层

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-geolocation': BuiduGeolocation
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16
        };
    },
    computed: {},
    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        },
        locationSuccess(e) {
            console.log(e);
        },
        locationError(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped></style>
