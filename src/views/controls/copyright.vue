<template>
    <baidu-map
        ref="BDMap"
        ak="S7gxefmASouTllUyjE71hWV3"
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    >
        <bm-copyright anchor="BMAP_ANCHOR_TOP_LEFT" :copyrights="copyrights" />
    </baidu-map>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduCopyright from '@/components/baidu-map/controls/copyright'; //版权控制层

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-copyright': BuiduCopyright
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            zoom: 16,
            copyrights: [
                {
                    id: 1,
                    content: `<p style='background-color: yellow'>测试自定义版权</p>`
                }
            ]
        };
    },
    computed: {},
    methods: {
        mapReady({ BMap, map }) {
            console.log(BMap, map);
        }
    }
};
</script>
<style lang="scss" scoped></style>
