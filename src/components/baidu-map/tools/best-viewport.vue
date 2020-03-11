<template>
    <bm-tool-wrapper v-if="showButton" :map="map" :BMap="BMap">
        <div class="best-viewport" :class="{active: active}" @click="setBestViewportClick">
            <i class="iconfont icon-location"></i>最佳视角
        </div>
    </bm-tool-wrapper>
</template>

<script>
import BaiduToolWrapper from './tool-wrapper'; //工具包装器
export default {
    name: 'bm-best-viewport',
    components: {
        'bm-tool-wrapper': BaiduToolWrapper
    },

    props: {
        map: Object,
        BMap: Object,
        points: {
            type: Array,
            default() {
                return [];
            }
        },
        //是否最佳视角
        best: {
            type: Boolean,
            default: false
        },
        //是否持续最佳视角
        auto: {
            type: Boolean,
            default: false
        },
        //是否显示最佳视角按钮
        showButton: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            mapConfig: {
                map: null,
                BMap: null,
                bestViewport: {
                    icon: 'controls',
                    title: '最佳视角',
                    visible: false
                }
            },
            active: false
        };
    },
    watch: {
        map(map) {
            this.mapConfig.map = map;
        },
        BMap(BMap) {
            this.mapConfig.BMap = BMap;
        },
        points: {
            handler(points) {
                this.auto && this.best && this.setBestViewport(points);
                this.mapConfig.points = points;
            },
            deep: true
        },
        best(bool) {
            this.active = bool;
        }
    },
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
        this.mapConfig.points = this.points;
        this.active = this.best;
        this.best && this.setBestViewport(this.points);
    },
    methods: {
        /**
         * 设置地图最佳视角
         * @param {Array} points 坐标点数组
         */
        setBestViewport(points = []) {
            debugger;
            if (this.mapConfig.map && points) {
                const view = this.mapConfig.map.getViewport(points); //获取最佳视角
                let zoom = view.zoom - 1; //获取最佳视角的缩放层级，减1更好适配边界问题
                zoom > 20 && (zoom = 20); //如果最佳视角大于19级则等于19级
                this.$emit('change', {
                    center: view.center,
                    zoom
                });
                this.mapConfig.map.setCenter(view.center);
                this.mapConfig.map.setZoom(zoom);
            }
        },
        /**
         * 点击设置最佳视角
         */
        setBestViewportClick() {
            this.active = true;
            this.setBestViewport(this.mapConfig.points);
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss" scoped>
.best-viewport {
    padding: 0 15px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;

    .iconfont {
        margin-right: 5px;
    }
}

.active {
    color: #409eff;
}
</style>
