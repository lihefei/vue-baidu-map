<template>
    <baidu-map ref="BDMap" ak="S7gxefmASouTllUyjE71hWV3" :center="center" :zoom="zoom" @ready="mapReady">
        <bm-ground
            :bounds="bounds"
            :opacity="0.8"
            imageURL="http://lbsyun.baidu.com/jsdemo/img/si-huan.png"
            :displayOnMinLevel="3"
            :displayOnMaxLevel="19"
        />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduGround from '@/components/baidu-map/overlays/ground'; //地面层覆盖物

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-ground': BuiduGround
    },
    data() {
        return {
            center: { lng: 113.990887, lat: 26.419945},

            zoom: 10,
            bounds: {
                sw: { lng: 113.990887, lat: 26.419945 },
                ne: { lng: 114.599148, lat: 26.805797 }
            }, 
        };
    },
    computed: {},
    methods: {
        mapReady(BMap, map) {
            console.log(BMap, map);
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
