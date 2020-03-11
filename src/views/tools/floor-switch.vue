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
                <bm-floor-switch
                    :total="50"
                    :current-floor="5"
                    :pager-count="7"
                    :show-jumper="true"
                />
            </bm-control>

            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{height: 80}">
                <bm-floor-switch
                    :floors="[-3, -2, -1, 1, 3, 5, 7,  9, 10, 12, 14, 16, 18, 20, 22, 24]"
                    :current-floor="1"
                    :pager-count="8"
                    mode="vertical"
                    suffix="F"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    @prev-quick-click="prevQuickClick"
                    @next-quick-click="nextQuickClick"
                    @floor-click="floorClick"
                    @current-change="currentChange"
                    @jumpe="floorJumpe"
                />
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduFloorSwitch from '@/components/baidu-map/tools/floor-switch/floor-switch'; //楼层切换

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-floor-switch': BuiduFloorSwitch
    },

    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 108.640996, lat: 19.065555 },
                zoom: 16
            },
            floors: 100,
            floor: 1
        };
    },
    watch: {},

    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;
        },
        prevClick(floor) {
            console.log('上一楼', floor);
        },
        nextClick(floor) {
            console.log('下一楼', floor);
        },
        floorClick(floor) {
            console.log('楼层点击', floor);
        },
        floorJumpe(floor) {
            console.log('跳转', floor);
        },
        prevQuickClick(floor) {
            console.log('快速向前切换', floor);
        },
        nextQuickClick(floor) {
            console.log('快速向后切换', floor);
        },
        currentChange(floor, oldFloor) {
            console.log('楼层切换', floor, '切换前楼层', oldFloor);
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
