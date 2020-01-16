<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @zoomend="zoomend"
        @ready="mapReady"
    >
        <bm-overlay :position="center" class="custom-overlay" @initialize="overlayInit">
            <device-info />
        </bm-overlay>

        <bm-overlay
            ref="customOverlay"
            :position="center2"
            class="custom-overlay"
            @initialize="overlayInit"
        >
            <popover :visible.sync="showProper" :before-close="beforeClose">
                <div>111111111111111111111111111</div>
                <div>222222222222222222222222222</div>
                <div>333333333333333333333333333</div>
                <div>444444444444444444444444444</div>
                <div>444444444444444444444444444</div>
                <div>444444444444444444444444444</div>
                <div>444444444444444444444444444</div>
                <div>444444444444444444444444444</div>
            </popover>
        </bm-overlay>
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduOverlay from '@/components/baidu-map/overlays/overlay'; //自定义覆盖物
import Popover from './components/popover'; //自定义气泡
import DeviceInfo from './components/device-info'; //设备信息

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-overlay': BuiduOverlay,
        Popover,
        DeviceInfo
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            center2: { lng: 108.440996, lat: 19.065555 },
            zoom: 12,
            showProper: true
        };
    },
    computed: {},
    methods: {
        mapReady(BMap, map) {
            console.log(BMap, map);
        },
        beforeClose(done) {
            done();
        },
        overlayInit(data) {
            console.log(data);
        },
        zoomend() {
            this.$refs.customOverlay.setPosition();
        }
    }
};
</script>
<style lang="scss" scoped>
.custom-overlay {
    box-sizing: border-box;
    position: absolute;
}
</style>
