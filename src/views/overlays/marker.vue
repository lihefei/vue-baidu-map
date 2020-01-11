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
            @click="clickMap"
        />
    </baidu-map>
</template>
<script>
import BuiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduMapMarker from '@/components/baidu-map/overlays/marker'; //marker标记

export default {
    name: '',
    components: {
        'baidu-map': BuiduMap,
        'bm-marker': BuiduMapMarker
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },

            zoom: 16,
            icon: {
                url: require('@/assets/position.png'),
                size: {
                    width: 48,
                    height: 48
                }
            }
        };
    },
    computed: {},
    methods: {
        mapReady(BMap, map) {
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
