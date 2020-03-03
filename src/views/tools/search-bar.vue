<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
            <bm-search-bar :map="map" :BMap="BMap" @confirm="confirm" @clear="clear" @searchcomplete="searchComplete" placeholder="请输入搜索内容" />
        </bm-control>
        <bm-marker
            v-if="markerPoint"
            :position="markerPoint"
            :dragging="true"
        />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduSearchBar from '@/components/baidu-map/tools/search-bar'; //搜索条
import BaiduMapMarker from '@/components/baidu-map/overlays/marker'; //marker标记

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-search-bar': BuiduSearchBar,
        'bm-marker': BaiduMapMarker
    },
    data() {
        return {
            BMap: null,
            map: null,
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16,
            keyword: '',
            markerPoint: null
        };
    },
    computed: {},
    methods: {
        mapReady({BMap, map}) {
            this.BMap = BMap;
            this.map = map;            
        },
        searchComplete(e) {
            console.log(e);
        },
        confirm(e) {
            this.center = this.markerPoint = e.point;
            console.log(e);
        },
        clear() {
            this.markerPoint = null;
        }
    }
};
</script>
<style lang="scss" scoped></style>
