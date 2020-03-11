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
        'bm-floor-switch': BuiduFloorSwitch
    },

    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 113.959454, lat: 22.537417 },
                zoom: 19
            },
            floor: 1,
            tileList: []
        };
    },
    watch: {
        floor() {
            this.updateTileFloors();
        }
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
                { id: 10018, floors: [2, 3, 4] },
                { id: 10033, floors: 1 }
            ];

            let floors = [];

            this.tileList = data.map(item => {
                let url = `http://139.9.62.21:9000/salvage/images/tiles/${item.id}/${this.floor}/{Z}/tile-{X}_{Y}.png`;

                if (Array.isArray(item.floors)) {
                    floors.push(...item.floors);
                    floors = Array.from(new Set(floors));
                } else if (typeof item.floors === 'number') {
                    for (let i = 1; i <= item.floors; i++) {
                        !floors.includes(i) && floors.push(i);
                    }
                }
                return url;
            });

            this.floors = floors;
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
