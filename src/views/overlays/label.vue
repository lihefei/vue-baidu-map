<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-label
            :position="center"
            content="示例lable"
            :offset="{ width: 10, height: 10 }"
            :z-index="1"
            :label-style="labelStyle"
            :mass-clear="true"
        />

        <bm-label :position="center2" content="示例lable222222" label-class="label-test" />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BaiduMapLabel from '@/components/baidu-map/overlays/label'; //标签覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-label': BaiduMapLabel
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            center2: { lng: 108.640996, lat: 19.068555 },
            zoom: 16,
            labelStyle: { color: 'red' }
        };
    },
    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        }
    }
};
</script>
<style lang="scss" scoped>
::v-deep .label-test {
    border: 1px solid rgb(255, 255, 255) !important;
    padding: 2px 5px !important;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;
    border-radius: 2px;
    transform: translateX(-50%);
}
::v-deep .label-test:before {
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
