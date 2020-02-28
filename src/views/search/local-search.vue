<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
            <input type="text" v-model="keyword" placeholder="请输入名称" />
        </bm-control>
        <bm-local-search
            :keyword="keyword"
            :resultRender="true"
            :selectFirstResult="false"
            @markersset="markersSet"
            @infohtmlset="infoHtmlSet"
            @resultshtmlset="resultsHtmlSet"
            @searchcomplete="searchComplete"
        ></bm-local-search>
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduLocalSearch from '@/components/baidu-map/search/local-search'; //本地搜索

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-local-search': BuiduLocalSearch
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
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        },

        markersSet(e) {
            console.log(e);
        },
        infoHtmlSet(e) {
            console.log(e);
        },
        resultsHtmlSet(e) {
            console.log(e);
        },
        searchComplete(e) {
            console.log(e);

            if (e) {
                let firstPoi = e.getPoi(0);
                console.log(firstPoi);
                firstPoi && (this.center = firstPoi.point);
            }
        }
    }
};
</script>
<style lang="scss" scoped></style>
