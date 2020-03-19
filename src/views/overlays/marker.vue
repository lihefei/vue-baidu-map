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
            :rotation="75"
            :icon="icon"
            :dragging="true"
            :label="{content: 'xxxxxx'}"
            @click="clickMap"
        />

        <bm-marker
            :position="center2"
            :icon="icon"
            :dragging="true"
            :label="label"
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
            label: {
                content: '用户张三',
                opts: { offset: { width: 24, height: -24 } },
                labelStyle: {
                    border: '1px solid rgb(255, 255, 255)',
                    padding: '2px 5px',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 5px',
                    borderRadius: '2px',
                    transform: 'translateX(-50%)'
                }
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
::v-deep .BMapLabel:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    border-style: solid;
    border-width: 8px 6px 0;
    border-color: #fff transparent;
    -webkit-transform: translate(-50%, 8px);
    transform: translate(-50%, 8px);
}
</style>
