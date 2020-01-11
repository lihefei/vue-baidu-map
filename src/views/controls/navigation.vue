<template>
    <baidu-map ref="BDMap" ak="S7gxefmASouTllUyjE71hWV3" :center="center" :zoom="zoom" @ready="mapReady">
        <bm-navigation />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduNavigation from '@/components/baidu-map/controls/navigation'; //缩放导航控制层

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-navigation': BuiduNavigation,
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
