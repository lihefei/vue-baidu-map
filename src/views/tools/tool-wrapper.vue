<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :center="mapConfig.center"
            :zoom="mapConfig.zoom"
            @ready="mapReady"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                <bm-tool-wrapper><button>按钮</button>|<span>文字文字文字文字</span></bm-tool-wrapper>
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义版权控制层
import BuiduToolWrapper from '@/components/baidu-map/tools/tool-wrapper'; //工具包装器

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-tool-wrapper': BuiduToolWrapper
    },
    data() {
        return {
            mapConfig: {
                center: { lng: 108.640996, lat: 19.065555 },
                zoom: 16,
            },
            map: null,
            BMap: null
        };
    },
    watch: {},
    

    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;
            

            console.log(BMap, map);
        },
        
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
