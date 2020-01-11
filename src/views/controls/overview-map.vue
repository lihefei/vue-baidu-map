<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-overview-map :isOpen="true" @viewchanged="viewchanged" />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduOverviewMap from '@/components/baidu-map/controls/overview-map'; //缩略图控制层

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-overview-map': BuiduOverviewMap
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
        },
        viewchanged(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped></style>
