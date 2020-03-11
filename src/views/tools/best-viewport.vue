<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :center="mapConfig.center"
            :zoom="mapConfig.zoom"
            @ready="mapReady"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT">
                <bm-best-viewport
                    v-if="map"
                    :map="map"
                    :BMap="BMap"
                    :points="mapConfig.points"
                    :best="true"
                    :auto="true"
                    :show-button="true"
                    @change="bestViewportChange"
                />
            </bm-control>

            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                <button @click="addPoint">加个点</button>
            </bm-control>

            <bm-marker v-for="point in mapConfig.points" :position="point" />
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduBestViewport from '@/components/baidu-map/tools/best-viewport'; //最佳视角
import BaiduMapMarker from '@/components/baidu-map/overlays/marker'; //marker标记

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-best-viewport': BuiduBestViewport,
        'bm-marker': BaiduMapMarker
    },

    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 108.640996, lat: 19.065555 },
                zoom: 16,
                points: [
                    { lng: 108.641158, lat: 19.071005 },
                    { lng: 108.65183, lat: 19.062804 },
                    { lng: 108.634043, lat: 19.059968 },
                    { lng: 108.634079, lat: 19.067861 },
                    { lng: 108.644104, lat: 19.069706 },
                    { lng: 108.639864, lat: 19.049307 },
                    { lng: 108.654165, lat: 19.046334 },
                    { lng: 108.62912, lat: 19.037757 },
                    { lng: 108.636451, lat: 19.08918 },
                    { lng: 108.651758, lat: 19.098712 },
                    { lng: 108.631887, lat: 19.103016 },
                    { lng: 108.668826, lat: 19.101581 },
                    { lat: 19.080212, lng: 108.645038 },
                    { lat: 19.05076, lng: 108.649889 }
                ]
            }
        };
    },
    watch: {},

    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;

            console.log(BMap, map);
        },

        bestViewportChange({ center, zoom }) {
            this.mapConfig.center = center;
            this.mapConfig.zoom = zoom;
        },
        addPoint() {
            this.mapConfig.points.push({ lng: 108.682174, lat: 19.203177 });
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
