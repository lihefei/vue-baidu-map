<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-map-type anchor="BMAP_ANCHOR_TOP_LEFT" />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BaiduMapType from '@/components/baidu-map/controls/map-type'; //地图类型控制层

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-map-type': BaiduMapType
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
        }
    }
};
</script>
<style lang="scss" scoped></style>
