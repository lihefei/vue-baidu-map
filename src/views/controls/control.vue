<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
            <div style="background-color: red;">自定义控制器</div>
        </bm-control>
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl
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
