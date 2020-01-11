<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-boundary
            :name="address"
            strokeColor="red"
            fillColor="yellow"
            :fillOpacity="0.5"
            :strokeWeight="3"
            :strokeOpacity="0.5"
            strokeStyle="solid"
            :massClear="true"
            :dragging="true"
            :diting="true"
        />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduBoundary from '@/components/baidu-map/overlays/boundary'; //行政区域覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-boundary': BuiduBoundary
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 10,
            address: '东方市'
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
