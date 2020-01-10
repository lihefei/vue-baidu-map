<template>
    <div class="index">
        <baidu-map ref="BDMap" ak="S7gxefmASouTllUyjE71hWV3" :center="center" :zoom="zoom" @ready="mapReady" @zoomend="zoomend">
            <div class="control">
                <bm-scale />
                <bm-navigation />
                <bm-map-type />
                <bm-geolocation @locationSuccess="locationSuccess" @locationError="locationError" />
                <bm-copyright anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :copyrights="[{ id: 1, content: `<p style='background-color: yellow'>测试自定义版权</p>` }]" />
                <bm-control :offset="{ width: 100, height: 10 }"><div style="background-color: red;">自定义控制器</div></bm-control>
                <bm-city-list :offset="{ width: 500, height: 10 }" @changeAfter="changeAfter" />
                <bm-overview-map :isOpen="true" @viewchanged="viewchanged" />
                <bm-panorama />
            </div>

            <input type="text" v-model="address" />
            <span @click="test">+++++</span>
            <button @click="trafficVisible = !trafficVisible">切换交通路况</button>

            <div class="overlay">
                <bm-marker :position="center" :rotation="180" :icon="icon" :dragging="true" @click="clickMap" />

                <!--<bm-circle
                :center="center"
                :radius="radius"
                :strokeColor="color"
                fillColor="rgba(255,255,255, .5)"
                :strokeWeight="3"
                :strokeOpacity="0.5"
                :fillOpacity="0.8"
                strokeStyle="solid"
                :massClear="true"
                :dragging="true"
                :diting="true"
                :clicking="true"
                @click="clickMap"
                />

                <bm-polyline
                    :path="path"
                    :strokeColor="color"
                    :strokeWeight="3"
                    :strokeOpacity="0.5"
                    strokeStyle="solid"
                    :massClear="true"
                    :dragging="true"
                    :diting="true"
                    :clicking="true"
                    @click="clickMap"
                />

                <bm-polygon
                    :path="rectangle"
                    :strokeColor="color"
                    fillColor="blue"
                    :fillOpacity="0.5"
                    :strokeWeight="3"
                    :strokeOpacity="0.5"
                    strokeStyle="solid"
                    :massClear="true"
                    :dragging="true"
                    :diting="true"
                    :clicking="true"
                    @click="clickMap"
                />

                <bm-polygon
                    :path="polygon"
                    :strokeColor="color"
                    fillColor="yellow"
                    :fillOpacity="0.5"
                    :strokeWeight="3"
                    :strokeOpacity="0.5"
                    strokeStyle="solid"
                    :massClear="true"
                    :dragging="true"
                    :diting="true"
                    :clicking="true"
                    @click="clickMap"
                />

                <bm-label
                    :position="center"
                    content="示例lable"
                    :offset="{ width: 10, height: 10 }"
                    :zIndex="1"
                    :labelStyle="{ color: 'red' }"
                    :massClear="true"
                    @click="clickMap"
                />

                <bm-point-collection
                    :points="rectangle"
                    shape="BMAP_POINT_SHAPE_STAR"
                    size="BMAP_POINT_SIZE_BIG"
                    color="red"
                    @click="clickMap"
                />

                <bm-ground
                    :bounds="bounds"
                    :opacity="0.8"
                    imageURL="http://lbsyun.baidu.com/jsdemo/img/si-huan.png"
                    :displayOnMinLevel="3"
                    :displayOnMaxLevel="19"
                    @click="clickMap"
                />

                
                -->
                <bm-overlay ref="customOverlay" :position="center2" class="custom-overlay" @initialize="overlayInit">
                    <div style="width: 1px; height: 1px; background-color: red;"></div>
                    <map-popover :visible.sync="showProper" :before-close="beforeClose">
                        <!-- <div class="device-container">
                        <ul class="device-info">
                            <li>
                                <div class="key">名称：</div>
                                <div class="value full">田七(1001)</div>
                                <div class="status 0">离线</div>
                            </li>
                            <li>
                                <div class="key">定位：</div>
                                <div class="value full">BDS(RTK定位)</div>
                            </li>
                            <li>
                                <div class="key">速度：</div>
                                <div class="value">10km/h</div>
                                <div class="key">方向：</div>
                                <div class="value">西北</div>
                            </li>
                            <li>
                                <div class="key">时间：</div>
                                <div class="value full">2020-01-06 18:20:31</div>
                            </li>
                            <li>
                                <div class="key">地址：</div>
                                <div class="value full"><a class="address-btn">获取地址</a></div>
                            </li>
                        </ul>
                    </div> -->

                        <div v-for="(item, index) in list" :key="index">{{ item }}</div>
                    </map-popover>
                </bm-overlay>
            </div>

            <!-- <div class="layer">
                <bm-tile tileUrlTemplate="http://139.9.198.4:9000/salvage/images/tiles/10033/1/{Z}/tile-{X}_{Y}.png"></bm-tile>
                <bm-traffic v-if="trafficVisible" />
            </div> -->

            <div class="others">
                <!-- <bm-boundary
                    :name="address"
                    :strokeColor="color"
                    fillColor="yellow"
                    :fillOpacity="0.5"
                    :strokeWeight="3"
                    :strokeOpacity="0.5"
                    strokeStyle="solid"
                    :massClear="true"
                    :dragging="true"
                    :diting="true"
                /> -->

                <bm-control :offset="{ width: 100, height: 10 }" anchor="BMAP_ANCHOR_TOP_LEFT">
                    <bm-auto-complete v-model="keyword" @searchComplete="searchComplete" @confirm="onconfirm"><!-- <input /> --></bm-auto-complete>
                </bm-control>
                <bm-local-search
                    :keyword="keyword"
                    :resultRender="true"
                    :selectFirstResult="true"
                    @markersset="markersSet"
                    @infohtmlset="infoHtmlSet"
                    @resultshtmlset="resultsHtmlSet"
                    @searchcomplete="searchComplete"
                >
                </bm-local-search>
            </div>
        </baidu-map>
    </div>
</template>
<script>
import { createPoint } from '@/components/baidu-map/base/factory'; //百度地图常用方法
import BuiduMap from '@/components/baidu-map/map'; //地图
import BuiduMapMarker from '@/components/baidu-map/overlays/marker'; //marker标记
import BuiduMapCircle from '@/components/baidu-map/overlays/circle'; //原型覆盖物
import BuiduMapPolyline from '@/components/baidu-map/overlays/polyline'; //线条覆盖物
import BuiduMapPolygon from '@/components/baidu-map/overlays/polygon'; //多边形覆盖物
import BuiduMapLabel from '@/components/baidu-map/overlays/label'; //标签覆盖物
import BuiduPointCollection from '@/components/baidu-map/overlays/point-collection'; //海量点覆盖物
import BuiduGround from '@/components/baidu-map/overlays/ground'; //地面层覆盖物
import BuiduOverlay from '@/components/baidu-map/overlays/overlay'; //自定义覆盖物

import BuiduScale from '@/components/baidu-map/controls/scale'; //缩放控制层
import BuiduNavigation from '@/components/baidu-map/controls/navigation'; //缩放控制层
import BuiduMapType from '@/components/baidu-map/controls/map-type'; //缩放控制层
import BuiduGeolocation from '@/components/baidu-map/controls/geolocation'; //缩放控制层
import BuiduCopyright from '@/components/baidu-map/controls/copyright'; //自定义版权控制层
import BuiduControl from '@/components/baidu-map/controls/control'; //自定义版权控制层
import BuiduCityList from '@/components/baidu-map/controls/city-list'; //城市控制层
import BuiduOverviewMap from '@/components/baidu-map/controls/overview-map'; //缩略图控制层
import BuiduPanorama from '@/components/baidu-map/controls/panorama'; //街景控制层

import BuiduTile from '@/components/baidu-map/layers/tile'; //瓦片叠加层
import BuiduTraffic from '@/components/baidu-map/layers/traffic'; //路况叠加层

import BuiduBoundary from '@/components/baidu-map/others/boundary'; //行政区域覆盖物
import BuiduAutoComplete from '@/components/baidu-map/others/auto-complete'; //行政区域覆盖物

import BuiduLocalSearch from '@/components/baidu-map/search/local-search'; //本地搜索

import MapPopover from '@/components/map-popover'; //自定义气泡

export default {
    name: 'index',
    components: {
        'baidu-map': BuiduMap,
        'bm-marker': BuiduMapMarker,
        'bm-circle': BuiduMapCircle,
        'bm-polyline': BuiduMapPolyline,
        'bm-polygon': BuiduMapPolygon,
        'bm-label': BuiduMapLabel,
        'bm-point-collection': BuiduPointCollection,
        'bm-ground': BuiduGround,
        'bm-boundary': BuiduBoundary,
        'bm-overlay': BuiduOverlay,
        'bm-scale': BuiduScale,
        'bm-navigation': BuiduNavigation,
        'bm-map-type': BuiduMapType,
        'bm-geolocation': BuiduGeolocation,
        'bm-copyright': BuiduCopyright,
        'bm-control': BuiduControl,
        'bm-city-list': BuiduCityList,
        'bm-overview-map': BuiduOverviewMap,
        'bm-panorama': BuiduPanorama,
        'bm-tile': BuiduTile,
        'bm-traffic': BuiduTraffic,
        'bm-auto-complete': BuiduAutoComplete,
        'bm-local-search': BuiduLocalSearch,
        MapPopover
    },
    data() {
        return {
            center: { lng: 108.640996, lat: 19.065555 },
            center2: { lng: 108.640996, lat: 19.065555 },
            position: { lng: 108.740996, lat: 19.065555 },
            zoom: 16,
            icon: {
                url: require('@/assets/position.png'),
                size: {
                    width: 48,
                    height: 48
                }
            },
            radius: 60080,
            color: 'red',
            path: [{ lng: 114.245, lat: 26.325 }, { lng: 114.245, lat: 26.885 }],
            rectangle: [{ lng: 113.897751, lat: 26.405797 }, { lng: 114.599148, lat: 26.405797 }, { lng: 114.599148, lat: 26.150782 }, { lng: 113.897751, lat: 26.150782 }],
            polygon: [
                { lng: 113.827611, lat: 26.219256 },
                { lng: 114.356534, lat: 26.691235 },
                { lng: 114.710682, lat: 26.28769 },
                { lng: 114.393328, lat: 25.920161 },
                { lng: 113.990887, lat: 26.019945 }
            ],
            bounds: {
                sw: { lng: 113.990887, lat: 26.419945 },
                ne: { lng: 114.599148, lat: 26.805797 }
            },
            address: '吉安',
            list: ['111111111111'],
            showProper: true,
            trafficVisible: true,
            keyword: ''
        };
    },
    methods: {
        changeCenter() {
            this.zoom = 15;
        },
        clickMap(e) {
            console.log(e);
        },
        mapReady(BMap, map) {
            console.log(BMap, map);
        },
        test() {
            this.list.push('111111111111');

            // this.radius += 1080;
            // this.path.push({
            //     lng: this.path[this.path.length - 1].lng + 0.1,
            //     lat: this.path[this.path.length - 1].lat + 0.1
            // });
            // let popped = this.path.pop();

            // this.path.push({
            //     lng: popped.lng + 0.1,
            //     lat: popped.lat
            // });
        },
        overlayInit(data) {
            // let { BMap, map, el, overlay } = data;
            // this.map = map;
            // this.el = el;
            // this.overlay = overlay;
            // this.setStyle(el, this.center2, map);
        },
        zoomend() {
            this.$refs.customOverlay.setPosition();
        },

        beforeClose(done) {
            done();
        },
        locationSuccess(e) {
            console.log(e);
        },
        locationError(e) {
            console.log(e);
        },
        changeAfter(e) {
            console.log(e);
        },
        viewchanged(e) {
            console.log(e);
        },
        searchComplete(e) {
            console.log(e);
            
            if (e) {
                let firstPoi = e.getPoi(0);
                this.center = firstPoi.point;
                console.log(firstPoi);
            }
            
            

            
        },
        onconfirm(e) {
            console.log(e);
        },
        markersSet(e) {
            console.log(e);
        },
        infoHtmlSet(e) {
            console.log(e);
        },
        resultsHtmlSet(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped>
.index {
    height: 100%;
}
.custom-overlay {
    box-sizing: border-box;
    position: absolute;

    .device-container {
        .device-info {
            width: 220px;
            position: relative;
            margin: 0;
            padding: 0;
            li {
                overflow: hidden;
                line-height: 16px;
                list-style: none;

                .key,
                .value {
                    float: left;
                    padding: 2px;
                }
                .key {
                    width: 50px;
                    text-align: right;
                }
                .value {
                    width: 50px;
                    color: #666;
                }
                .full {
                    width: auto;
                    float: none;
                    margin-left: 50px;
                }

                .status {
                    position: absolute;
                    right: 10px;
                    top: 2px;
                    padding: 0 4px;
                    border-radius: 2px;
                    color: #fff;
                    background-color: #999;
                }
                .online {
                    background-color: #0c0;
                }
            }
        }
    }
}
</style>
