<template>
    <baidu-map ref="BDMap" ak="S7gxefmASouTllUyjE71hWV3" :center="center" :zoom="zoom" @ready="mapReady">
        <bm-circle
        :center="center"
        :radius="radius"
        :strokeColor="color"
        fillColor="rgba(255,255,255, .5)"
        :strokeWeight="3"
        :strokeOpacity="0.5"
        :fillOpacity="0.8"
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
import BuiduMapCircle from '@/components/baidu-map/overlays/circle'; //圆型覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-circle': BuiduMapCircle
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },

            zoom: 12,
            radius: 6000,
            color: 'red',
            
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
