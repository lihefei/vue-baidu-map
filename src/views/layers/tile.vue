<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-tile
            tileUrlTemplate="http://139.9.198.4:9000/salvage/images/tiles/10033/1/{Z}/tile-{X}_{Y}.png"
        />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduTile from '@/components/baidu-map/layers/tile'; //瓦片叠加层

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-tile': BuiduTile
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
