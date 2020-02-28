<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
            <button @click="trafficVisible = !trafficVisible">切换显示</button>
        </bm-control>

        <bm-traffic v-if="trafficVisible" />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduTraffic from '@/components/baidu-map/layers/traffic'; //路况叠加层
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-traffic': BuiduTraffic,
        'bm-control': BuiduControl
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
        mapReady({BMap, map}) {
            console.log(BMap, map);
        }
    }
};
</script>
<style lang="scss" scoped></style>
