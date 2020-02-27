import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/index/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        children: [
            {
                path: '/',
                redirect: '/map'
            },
            {
                path: '/map',
                name: 'map',
                component: () => import('@/views/map/map.vue'),
                meta: {
                    title: '基础地图'
                }
            },
            {
                path: '/overlays/marker',
                name: 'marker',
                component: () => import('@/views/overlays/marker.vue'),
                meta: {
                    title: '标记'
                }
            },
            {
                path: '/overlays/label',
                name: 'label',
                component: () => import('@/views/overlays/label.vue'),
                meta: {
                    title: '标签'
                }
            },
            {
                path: '/overlays/polyline',
                name: 'polyline',
                component: () => import('@/views/overlays/polyline.vue'),
                meta: {
                    title: '线段'
                }
            },
            {
                path: '/overlays/circle',
                name: 'circle',
                component: () => import('@/views/overlays/circle.vue'),
                meta: {
                    title: '圆形'
                }
            },
            {
                path: '/overlays/rectangle',
                name: 'rectangle',
                component: () => import('@/views/overlays/rectangle.vue'),
                meta: {
                    title: '矩形'
                }
            },
            {
                path: '/overlays/polygon',
                name: 'polygon',
                component: () => import('@/views/overlays/polygon.vue'),
                meta: {
                    title: '多边形'
                }
            },
            {
                path: '/overlays/boundary',
                name: 'boundary',
                component: () => import('@/views/overlays/boundary.vue'),
                meta: {
                    title: '行政区域'
                }
            },
            {
                path: '/overlays/pointCollection',
                name: 'pointCollection',
                component: () => import('@/views/overlays/point-collection.vue'),
                meta: {
                    title: '海量点'
                }
            },
            {
                path: '/overlays/ground',
                name: 'ground',
                component: () => import('@/views/overlays/ground.vue'),
                meta: {
                    title: '地面覆盖物'
                }
            },
            {
                path: '/overlays/overlay',
                name: 'overlay',
                component: () => import('@/views/overlays/overlay.vue'),
                meta: {
                    title: '自定义覆盖物'
                }
            },
            {
                path: '/controls/navigation',
                name: 'navigation',
                component: () => import('@/views/controls/navigation.vue'),
                meta: {
                    title: '缩放条'
                }
            },
            {
                path: '/controls/mapType',
                name: 'mapType',
                component: () => import('@/views/controls/map-type.vue'),
                meta: {
                    title: '地图类型'
                }
            },
            {
                path: '/controls/geolocation',
                name: 'geolocation',
                component: () => import('@/views/controls/geolocation.vue'),
                meta: {
                    title: '本地定位'
                }
            },
            {
                path: '/controls/cityList',
                name: 'cityList',
                component: () => import('@/views/controls/city-list.vue'),
                meta: {
                    title: '城市列表'
                }
            },
            {
                path: '/controls/overviewMap',
                name: 'overviewMap',
                component: () => import('@/views/controls/overview-map.vue'),
                meta: {
                    title: '缩略地图'
                }
            },
            {
                path: '/controls/panorama',
                name: 'panorama',
                component: () => import('@/views/controls/panorama.vue'),
                meta: {
                    title: '全景地图'
                }
            },
            {
                path: '/controls/scale',
                name: 'scale',
                component: () => import('@/views/controls/scale.vue'),
                meta: {
                    title: '标尺'
                }
            },
            {
                path: '/controls/copyright',
                name: 'copyright',
                component: () => import('@/views/controls/copyright.vue'),
                meta: {
                    title: '版权'
                }
            },

            {
                path: '/controls/control',
                name: 'control',
                component: () => import('@/views/controls/control.vue'),
                meta: {
                    title: '自定义控制器'
                }
            },
            {
                path: '/layers/tile',
                name: 'tile',
                component: () => import('@/views/layers/tile.vue'),
                meta: {
                    title: '瓦片'
                }
            },
            {
                path: '/layers/traffic',
                name: 'traffic',
                component: () => import('@/views/layers/traffic.vue'),
                meta: {
                    title: '交通流量'
                }
            },
            {
                path: '/search/localSearch',
                name: 'localSearch',
                component: () => import('@/views/search/local-search.vue'),
                meta: {
                    title: '本地商圈'
                }
            },
            {
                path: '/search/autoComplete',
                name: 'autoComplete',
                component: () => import('@/views/search/auto-complete.vue'),
                meta: {
                    title: '自动完成'
                }
            },
            {
                path: '/search/searchBar',
                name: 'searchBar',
                component: () => import('@/views/search/search-bar.vue'),
                meta: {
                    title: '搜索条'
                }
            },
            {
                path: '/contextMenu/contextMenu',
                name: 'contextMenu',
                component: () => import('@/views/context-menu/context-menu.vue'),
                meta: {
                    title: '菜单'
                }
            },
            {
                path: '/contextMenu/contextMenuItem',
                name: 'contextMenuItem',
                component: () => import('@/views/context-menu/context-menu-item.vue'),
                meta: {
                    title: '菜单项'
                }
            },

            {
                path: '/tools/drawingManager',
                name: 'drawingManager',
                component: () => import('@/views/tools/drawing-manager.vue'),
                meta: {
                    title: '绘图'
                }
            },
            {
                path: '/tools/toolWrapper',
                name: 'toolWrapper',
                component: () => import('@/views/tools/tool-wrapper.vue'),
                meta: {
                    title: '工具包装器'
                }
            },
            {
                path: '/tools/commonTools',
                name: 'commonTools',
                component: () => import('@/views/tools/common-tools.vue'),
                meta: {
                    title: '常用工具'
                }
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
