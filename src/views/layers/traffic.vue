<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-traffic v-if="trafficVisible" />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduTraffic from '@/components/baidu-map/layers/traffic'; //路况叠加层

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-traffic': BuiduTraffic
    },
    data() {
        return {
            center: { lng: 108.946267, lat: 34.349519 },
            zoom: 7,
            trafficVisible: true
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
