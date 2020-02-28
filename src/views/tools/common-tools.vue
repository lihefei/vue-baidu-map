<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :center="mapConfig.center"
            :zoom="mapConfig.zoom"
            @ready="mapReady"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT"  >
                <bm-common-tools  
                v-if="map" 
                :map="map" 
                :BMap="BMap" 
                :traffic="true"
            />
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduCommonTools from '@/components/baidu-map/tools/common-tools'; //常用工具

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-common-tools': BuiduCommonTools
    },

    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 108.946267, lat: 34.349519 },
                zoom: 7,
            },
           
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
