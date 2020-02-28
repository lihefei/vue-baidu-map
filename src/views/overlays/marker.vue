<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-marker
            :position="center"
            :rotation="180"
            :icon="icon"
            :dragging="true"
            :label="{content: 'xxxxxx'}"
            @click="clickMap"
        />

        <bm-marker
            :position="center2"
            :rotation="180"
            :icon="icon"
            :dragging="true"
            :label="{content: '用户张三', opts: {offset: {width: 24, height: -18, labelStyle}}}"
            @click="clickMap"
        />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BaiduMapMarker from '@/components/baidu-map/overlays/marker'; //marker标记

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-marker': BaiduMapMarker
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            center2: { lng: 108.660996, lat: 19.065555 },
            zoom: 16,
            icon: {
                url: require('@/assets/position.png'),
                size: {
                    width: 48,
                    height: 48
                }
            },
            labelStyle: {
                padding: '2px 8px 3px',
                border: 0,
                borderRadius: '2px',
                color: '#fff',
                backgroundColor: 'rgba(0,0,0, .5)',
                transform: 'translate(-50%, 0)'
            }
        };
    },
    computed: {},
    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        },
        clickMap(e) {
            console.log(this);
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
