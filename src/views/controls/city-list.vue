<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-city-list @changeAfter="changeAfter" />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduCityList from '@/components/baidu-map/controls/city-list'; //城市控制层

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-city-list': BuiduCityList
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
        changeAfter(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped></style>
