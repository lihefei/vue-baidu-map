<template>
    <bm-tool-wrapper :map="map" :BMap="BMap">
        <bm-floor-pagination
            :list="floors"
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
            @page-click="floorClick"
            @current-change="currentChange"
            @jumpe="floorJumpe"
        />
    </bm-tool-wrapper>
</template>

<script>
import BaiduToolWrapper from '../tool-wrapper'; //工具包装器
import BaiduFloorPagination from './floor-pagination'; //楼层分页
export default {
    name: 'bm-floor-switch',
    components: {
        'bm-tool-wrapper': BaiduToolWrapper,
        'bm-floor-pagination': BaiduFloorPagination
    },
    props: {
        map: Object,
        BMap: Object,
        floors: Array,
        currentFloor: Number,
        pagerCount: Number,
        total: Number,
        showJumper: Boolean,
        mode: String,
        suffix: String
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
         * @param {Number} floor 楼层
         */
        prevClick(floor) {
            this.$emit('prev-click', floor);
        },
        /**
         * 下一楼
         * @param {Number} floor 楼层
         */
        nextClick(floor) {
            this.$emit('next-click', floor);
        },
        /**
         * 楼层点击
         * @param {Number} floor 楼层
         */
        floorClick(floor) {
            this.$emit('floor-click', floor);
        },
        /**
         * 楼层跳转
         * @param {Number} floor 楼层
         */
        floorJumpe(page) {
            this.$emit('jumpe', floor);
        },
        /**
         * 快速向前切换楼层
         * @param {Number} floor 楼层
         */
        prevQuickClick(floor) {
            this.$emit('prev-quick-click', floor);
        },
        /**
         * 快速向后切换楼层
         * @param {Number} floor 楼层
         */
        nextQuickClick(floor) {
            this.$emit('next-quick-click', floor);
        },
        /**
         * 楼层切换
         * @param {Number} floor 楼层
         * @param {Number} oldFloor 楼层
         */
        currentChange(floor, oldFloor) {
            this.$emit('current-change', floor, oldFloor);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
