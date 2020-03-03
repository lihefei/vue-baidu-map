<template>
   <bm-tool-wrapper :map="map" :BMap="BMap" >
       <div class="common-tools">
            <span 
                v-for="type in toolTypes"
                :class="{active: mapConfig[type].visible}"
                class="tool-item"
                @click="switchTypeClick(type)"
            ><i :class="`iconfont icon-${mapConfig[type].icon}`"></i>{{mapConfig[type].title}}</span>
       </div>
       <bm-traffic v-if="mapConfig.traffic.visible"/>
   </bm-tool-wrapper>
</template>

<script>
import BaiduToolWrapper from './tool-wrapper'; //工具包装器
import BuiduTraffic from '../layers/traffic'; //路况叠加层
export default {
    name: 'CommonTools',
    components: {
        'bm-tool-wrapper': BaiduToolWrapper,
        'bm-traffic': BuiduTraffic
    },
    
    props: {
        map: Object,
        BMap: Object,
        toolTypes: {
            type: Array,
            default() {
                return ['traffic', 'mapType'];
            }
        },
        traffic: {
            type: Boolean,
            default: false
        },
        mapType: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            mapConfig: {
                map: null,
                BMap: null,
                traffic: {
                    icon: 'traffic',
                    title: '路况',
                    visible: false
                },
                mapType: {
                    icon: 'layer',
                    title: '地图',
                    visible: false
                },
                bestViewport: {
                    icon: 'controls',
                    title: '最佳视角',
                    visible: false
                }
            },
        }
    },
    watch: {
        map(map) {
            this.mapConfig.map = map;
        },
        BMap(BMap) {
            this.mapConfig.BMap = BMap;
        },
        traffic(val) {
            this.mapConfig.traffic.visible = val;
        },
        mapType(val) {
            this.mapConfig.mapType.visible = val;
        },
        'mapConfig.mapType.visible': function(val) {
            let mapType = val ? BMAP_HYBRID_MAP : BMAP_NORMAL_MAP;
            this.map.setMapType(mapType);
        }
    },
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
        this.mapConfig.traffic.visible = this.traffic;
        this.mapConfig.mapType.visible = this.mapType;
    },
    methods: {
        /**
         * 切换工具状态
         * @param {Number} type 工具类型
         */
        switchTypeClick(type) {
            this.mapConfig[type].visible = !this.mapConfig[type].visible;
        }
    }
}
</script>

<style lang="scss" scoped>

.common-tools {
    .tool-item {
        font-size: 14px;
        background: #fff;
        border: none;
        padding: 0 15px;
        color: #606266;
        cursor: pointer;
        & > i {
            margin-right: 5px;
        }
    }

     .tool-item +  .tool-item {
         position: relative;
         &::before {
             content: '';
             position: absolute;
             left: -1px;
             top: 50%;
             height: 80%;
             border-left: 1px solid #ddd; 
             transform: translateY(-50%);

         }
     }
    
    .active {
        color: #409eff;
    }
}
</style>
