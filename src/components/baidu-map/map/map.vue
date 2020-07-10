<template>
    <div class="map-container">
        <div ref="view" class="map">地图</div>
        <slot></slot>
    </div>
</template>

<script>
import bindEvents from '../base/bind-event';
export default {
    name: 'bm-map',
    components: {},
    props: {
        ak: String,
        center: {
            type: [Object, String]
        },
        zoom: {
            type: Number,
            default: 10
        },
        minZoom: {
            type: Number,
            default: 3
        },
        maxZoom: {
            type: Number,
            default: 19
        },
        mapType: {
            type: String,
            default: 'BMAP_NORMAL_MAP'
        },
        highResolution: {
            type: Boolean,
            default: true
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        mapClick: {
            type: Boolean,
            default: true
        },
        dragging: {
            type: Boolean,
            default: true
        },
        inertialDragging: {
            type: Boolean,
            default: true
        },
        scrollWheelZoom: {
            type: Boolean,
            default: true
        },
        doubleClickZoom: {
            type: Boolean,
            default: true
        },
        pinchToZoom: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    },
    watch: {
        center: function(val, oldVal) {
            const { map } = this;
            if (
                Object.prototype.toString.call(val).includes('String') &&
                val !== oldVal
            ) {
                map.setCenter(val);
            }
        },
        'center.lng': function(val, oldVal) {
            const { BMap, map, center } = this;
            if (val !== oldVal && val >= -180 && val <= 180) {
                let point = new BMap.Point(val, center.lat);
                map.setCenter(point);
            }
        },
        'center.lat': function(val, oldVal) {
            const { BMap, map, center } = this;
            if (val !== oldVal && val >= -90 && val <= 90) {
                let point = new BMap.Point(center.lng, val);
                map.setCenter(point);
            }
        },
        zoom: function(val, oldVal) {
            const { map, minZoom, maxZoom } = this;
            if (val !== oldVal && val >= minZoom && val <= maxZoom) {
                map.setZoom(val);
            }
        },

        minZoom(val) {
            const { map } = this;
            map.setMinZoom(val);
        },
        maxZoom(val) {
            //const { map } = this;
            //map.setMaxZoom(val);
            this.setMaxZoom(val);
        },
        highResolution() {
            this.reset();
        },
        mapClick() {
            this.reset();
        },
        mapType(val) {
            const { map } = this;
            map.setMapType(global[val]);
        },
        dragging(val) {
            const { map } = this;
            val ? map.enableDragging() : map.disableDragging();
        },
        scrollWheelZoom(val) {
            const { map } = this;
            val ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom();
        },
        doubleClickZoom(val) {
            const { map } = this;
            val ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom();
        },
        inertialDragging(val) {
            const { map } = this;
            val ? map.enableInertialDragging() : map.disableInertialDragging();
        },

        pinchToZoom(val) {
            const { map } = this;
            val ? map.enablePinchToZoom() : map.disablePinchToZoom();
        },
        autoResize(val) {
            const { map } = this;
            val ? map.enableAutoResize() : map.disableAutoResize();
        }
    },
    mounted() {
        this.reset();
    },

    methods: {
        loadMapScript() {
            if (!global.BMap) {
                let ak = this.ak;
                global.BMap = {};
                global.BMap._preloader = new Promise((resovle, reject) => {
                    global._initBaiduMap = () => {
                        resovle(global.BMap);
                        global.document.body.removeChild(script);
                        global.BMap._preloader = null;
                        global._initBaiduMap = null;
                    };

                    let script = document.createElement('script');
                    global.document.body.appendChild(script);
                    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=_initBaiduMap`;
                });

                return global.BMap._preloader;
            } else if (!global.BMap._preloader) {
                return Promise.resolve(global.BMap);
            } else {
                return global.BMap._preloader;
            }
        },

        initMap(BMap) {
            this.BMap = BMap;
            this.init(BMap);
        },
        reset() {
            const { loadMapScript, initMap } = this;
            loadMapScript().then(initMap);
        },
        init(BMap) {
            let el = this.$refs.view;

            // this.$slots.default.forEach(vnode => {
            //     if (vnode.tag === 'view') {
            //         el = vnode.elm;
            //     }
            // });

            const map = new BMap.Map(el, {
                enableHighResolution: this.highResolution,
                enableMapClick: this.mapClick
            });
            this.map = map;

            const { setMapOptions, zoom, maxZoom, getCenterPoint } = this;

            setMapOptions();
            map.centerAndZoom(getCenterPoint(), zoom);

            bindEvents.call(this, map);

            this.$emit('ready', { BMap, map });
            this.setMaxZoom(maxZoom);
        },
        setMapOptions() {
            const {
                map,
                minZoom,
                maxZoom,
                mapType,
                dragging,
                inertialDragging,
                scrollWheelZoom,
                doubleClickZoom,
                pinchToZoom,
                autoResize
            } = this;

            minZoom && map.setMinZoom(minZoom);
            maxZoom && map.setMaxZoom(maxZoom);
            mapType && map.setMapType(global[mapType]);
            dragging ? map.enableDragging() : map.disableDragging();
            scrollWheelZoom
                ? map.enableScrollWheelZoom()
                : map.disableScrollWheelZoom();
            doubleClickZoom
                ? map.enableDoubleClickZoom()
                : map.disableDoubleClickZoom();

            inertialDragging
                ? map.enableInertialDragging()
                : map.disableInertialDragging();

            pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom();
            autoResize ? map.enableAutoResize() : map.disableAutoResize();
        },
        getCenterPoint() {
            const { center, BMap } = this;

            switch (typeof center) {
                case 'string':
                    return center;
                case 'object':
                    return new BMap.Point(center.lng, center.lat);
                default:
                    return new BMap.Point();
            }
        },
        setMaxZoom(zoom) {
            window.BMAP_NORMAL_MAP.m.X3 = window.BMAP_NORMAL_MAP.m.mc = window.BMAP_NORMAL_MAP.m.maxZoom = window.BMAP_PERSPECTIVE_MAP.m.X3 = window.BMAP_PERSPECTIVE_MAP.m.mc = window.BMAP_PERSPECTIVE_MAP.m.maxZoom = window.BMAP_SATELLITE_MAP.m.X3 = window.BMAP_SATELLITE_MAP.m.mc = window.BMAP_SATELLITE_MAP.m.maxZoom = window.BMAP_HYBRID_MAP.m.X3 = window.BMAP_HYBRID_MAP.m.mc = window.BMAP_HYBRID_MAP.m.maxZoom = zoom;

            this.map.setMaxZoom(zoom);
        }
    }
};
</script>

<style lang="scss" scoped>
.map-container {
    position: relative;
    height: 100%;

    .map {
        width: 100%;
        height: 100%;
    }
}
</style>
