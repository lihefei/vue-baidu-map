<template>
    <bm-tool-wrapper :map="map" :BMap="BMap">
        <bm-floor-pagination
            :list="list"
            :current-page="currentFloor"
            :pager-count="pagerCount"
            :total="total"
            :show-jumper="showJumper"
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

        <bm-tile v-for="tile in tileList" :tile-url-template="tile" />
    </bm-tool-wrapper>
</template>

<script>
import BaiduToolWrapper from './tool-wrapper'; //工具包装器
import BaiduFloorPagination from './floor-pagination'; //楼层分页
import BuiduTile from '../layers/tile'; //瓦片叠加层
export default {
    name: 'bm-floor-switch',
    components: {
        'bm-tool-wrapper': BaiduToolWrapper,
        'bm-floor-pagination': BaiduFloorPagination,
        'bm-tile': BuiduTile
    },
    props: {
        map: Object,
        BMap: Object,
        list: Array,
        currentFloor: Number,
        pagerCount: Number,
        total: Number,
        showJumper: Boolean,
        mode: String,
        suffix: String,
        tileList: Array
    },
    data() {
        return {
            mapConfig: {
                map: null,
                BMap: null
            }
        };
    },
    watch: {},
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
    },
    methods: {
        /**
         * 上一楼
         * @param {Number} page 楼层
         */
        prevClick(page) {
            this.$emit('prev-click', page);
        },
        /**
         * 下一楼
         * @param {Number} page 楼层
         */
        nextClick(page) {
            this.$emit('next-click', page);
        },
        /**
         * 楼层点击
         * @param {Number} page 楼层
         */
        pageClick(page) {
            this.$emit('page-click', page);
        },
        /**
         * 楼层跳转
         * @param {Number} page 楼层
         */
        pageJumpe(page) {
            this.$emit('jumpe', page);
        },
        /**
         * 快速向前切换楼层
         * @param {Number} page 楼层
         */
        prevQuickClick(page) {
            this.$emit('prev-quick-click', page);
        },
        /**
         * 快速向后切换楼层
         * @param {Number} page 楼层
         */
        nextQuickClick(page) {
            this.$emit('next-quick-click', page);
        },
        /**
         * 楼层切换
         * @param {Number} page 楼层
         * @param {Number} oldPage 楼层
         */
        currentChange(page, oldPage) {
            this.$emit('current-change', page, oldPage);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
