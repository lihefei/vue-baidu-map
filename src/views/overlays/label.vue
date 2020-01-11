<template>
    <baidu-map ref="BDMap" ak="S7gxefmASouTllUyjE71hWV3" :center="center" :zoom="zoom" @ready="mapReady">
        <bm-label :position="center" content="示例lable" :offset="{ width: 10, height: 10 }" :zIndex="1" :labelStyle="labelStyle" :massClear="true" />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduMapLabel from '@/components/baidu-map/overlays/label'; //标签覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-label': BuiduMapLabel
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16,
            labelStyle: { color: 'red' }
        };
    },
    methods: {
        mapReady(BMap, map) {
            console.log(BMap, map);
        }
    }
};
</script>
<style lang="scss" scoped></style>
