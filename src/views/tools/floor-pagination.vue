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
                <bm-tool-wrapper>
                    <bm-floor-pagination
                        :total="50"
                        :current-floor="5"
                        :pager-count="7"
                        :show-jumper="true"
                    />
                </bm-tool-wrapper>
            </bm-control>

            <bm-control anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{height: 80}">
                <bm-tool-wrapper>
                    <bm-floor-pagination
                        :list="list"
                        :current-page="currentPage"
                        :pager-count="pagerCount"
                        :mode="mode"
                        :suffix="suffix"
                        @prev-click="prevClick"
                        @next-click="nextClick"
                        @prev-quick-click="prevQuickClick"
                        @next-quick-click="nextQuickClick"
                        @page-click="pageClick"
                        @current-change="currentChange"
                        @jumpe="pageJumpe"
                    />
                </bm-tool-wrapper>
            </bm-control>
        </baidu-map>
    </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map/map/map'; //地图
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义控制层
import BaiduToolWrapper from '@/components/baidu-map/tools/tool-wrapper'; //工具包装器
import BaiduFloorPagination from '@/components/baidu-map/tools/floor-pagination'; //楼层分页

export default {
    name: '',
    components: {
        'baidu-map': BaiduMap,
        'bm-control': BuiduControl,
        'bm-tool-wrapper': BaiduToolWrapper,
        'bm-floor-pagination': BaiduFloorPagination
    },

    data() {
        return {
            map: null,
            BMap: null,
            mapConfig: {
                center: { lng: 108.640996, lat: 19.065555 },
                zoom: 15
            },
            currentPage: 1,
            pagerCount: 8,
            mode: 'vertical',
            suffix: 'F',
            list: [
                -3,
                -2,
                -1,
                1,
                2,
                3,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16
            ]
        };
    },
    methods: {
        mapReady({ BMap, map }) {
            this.map = map;
            this.BMap = BMap;
        },
        prevClick(page) {
            console.log('上一楼', page);
        },
        nextClick(page) {
            console.log('下一楼', page);
        },
        pageClick(page) {
            console.log('楼层点击', page);
        },
        pageJumpe(page) {
            console.log('跳转', page);
        },
        prevQuickClick(page) {
            console.log('快速向前切换', page);
        },
        nextQuickClick(page) {
            console.log('快速向后切换', page);
        },
        currentChange(page, oldPage) {
            console.log('楼层切换', page, '切换前楼层', oldPage);
        }
    }
};
</script>
<style lang="scss" scoped>
.wapper {
    height: 100%;
}
</style>
