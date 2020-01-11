<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
            <bm-auto-complete v-model="keyword" @searchcomplete="searchComplete" @confirm="confirm"></bm-auto-complete>
        </bm-control>
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduAutoComplete from '@/components/baidu-map/search/auto-complete'; //自动完成

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-control': BuiduControl,
        'bm-auto-complete': BuiduAutoComplete
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16,
            keyword: ''
        };
    },
    computed: {},
    methods: {
        mapReady(BMap, map) {
            console.log(BMap, map);
        },
        searchComplete(e) {
            console.log(e);
        },

        confirm(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped></style>
