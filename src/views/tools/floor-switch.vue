<template>
    <div class="wapper">
        <baidu-map
            ref="BDMap"
            ak="S7gxefmASouTllUyjE71hWV3"
            :maxZoom="23"
            :center="mapConfig.center"
            :zoom="mapConfig.zoom"
            @ready="mapReady"
        >
            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                <bm-floor-switch
                    v-if="map && BMap && tileList.length"
                    :map="map"
                    :BMap="BMap"
                    :list="floors"
                    :current-page="floor"
                    :pager-count="8"
                    :tile-list="tileList"
                    mode="vertical"
                    suffix="F"
                    @current-change="currentChange"
                />
            </bm-control>
            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{width: 100}">
                设置楼层：
                <input
                    type="number"
                    v-model="floorNumber"
                    :min="floors[0]"
                    :max="floors[floors.length - 1]"
                />
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BuiduFloorSwitch from '@/components/baidu-map/tools/floor-switch'; //楼层切换

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-floor-switch': BuiduFloorSwitch,
    },

    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 113.959454, lat: 22.537417 },
                zoom: 19,
            },

            floor: 1, //当前楼层
            floors: [], //楼层数数组
            tileList: [], //楼层瓦片url列表
            floorNumber: 1,
        };
    },
    watch: {
        floor(val) {
            this.updateTileFloors();
            this.floorNumber = val;
        },
        floorNumber(val) {
            this.floor = val * 1;
        },
    },

    mounted() {
        this.updateTileFloors();
    },

    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;
        },

        currentChange(floor, oldFloor) {
            this.floor = floor;
            console.log('楼层切换', floor, '切换前楼层', oldFloor);
        },
        /**
         * 更新楼层和瓦片数据
         */
        updateTileFloors() {
            let data = [
                { id: 10018, floors: [2, 3, 4], zIndex: 10 },
                { id: 10033, floors: 1, zIndex: 1 },
            ];

            let floors = [];

            this.tileList = data.map((item) => {
                let url = `http://139.9.62.21:9000/salvage/images/tiles/${item.id}/${this.floor}/{Z}/tile-{X}_{Y}.png`;
                let zIndex = item.zIndex;

                if (Array.isArray(item.floors)) {
                    floors.push(...item.floors);
                    floors = Array.from(new Set(floors));
                } else if (typeof item.floors === 'number') {
                    for (let i = 1; i <= item.floors; i++) {
                        !floors.includes(i) && floors.push(i);
                    }
                }
                return { url, zIndex };
            });

            this.floors = floors.sort((n, m) => n - m);
        },
    },
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
