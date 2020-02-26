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
                component: () => import('@/views/map/map.vue')
            },
            {
                path: '/overlays/marker',
                name: 'marker',
                component: () => import('@/views/overlays/marker.vue')
            },
            {
                path: '/overlays/label',
                name: 'label',
                component: () => import('@/views/overlays/label.vue')
            },
            {
                path: '/overlays/polyline',
                name: 'polyline',
                component: () => import('@/views/overlays/polyline.vue')
            },
            {
                path: '/overlays/circle',
                name: 'circle',
                component: () => import('@/views/overlays/circle.vue')
            },
            {
                path: '/overlays/rectangle',
                name: 'rectangle',
                component: () => import('@/views/overlays/rectangle.vue')
            },
            {
                path: '/overlays/polygon',
                name: 'polygon',
                component: () => import('@/views/overlays/polygon.vue')
            },
            {
                path: '/overlays/boundary',
                name: 'boundary',
                component: () => import('@/views/overlays/boundary.vue')
            },
            {
                path: '/overlays/pointCollection',
                name: 'pointCollection',
                component: () => import('@/views/overlays/point-collection.vue')
            },
            {
                path: '/overlays/ground',
                name: 'ground',
                component: () => import('@/views/overlays/ground.vue')
            },
            {
                path: '/overlays/overlay',
                name: 'overlay',
                component: () => import('@/views/overlays/overlay.vue')
            },
            {
                path: '/controls/navigation',
                name: 'navigation',
                component: () => import('@/views/controls/navigation.vue')
            },
            {
                path: '/controls/mapType',
                name: 'mapType',
                component: () => import('@/views/controls/map-type.vue')
            },
            {
                path: '/controls/geolocation',
                name: 'geolocation',
                component: () => import('@/views/controls/geolocation.vue')
            },
            {
                path: '/controls/cityList',
                name: 'cityList',
                component: () => import('@/views/controls/city-list.vue')
            },
            {
                path: '/controls/overviewMap',
                name: 'overviewMap',
                component: () => import('@/views/controls/overview-map.vue')
            },
            {
                path: '/controls/panorama',
                name: 'panorama',
                component: () => import('@/views/controls/panorama.vue')
            },
            {
                path: '/controls/scale',
                name: 'scale',
                component: () => import('@/views/controls/scale.vue')
            },
            {
                path: '/controls/copyright',
                name: 'copyright',
                component: () => import('@/views/controls/copyright.vue')
            },

            {
                path: '/controls/control',
                name: 'control',
                component: () => import('@/views/controls/control.vue')
            },
            {
                path: '/layers/tile',
                name: 'tile',
                component: () => import('@/views/layers/tile.vue')
            },
            {
                path: '/layers/traffic',
                name: 'traffic',
                component: () => import('@/views/layers/traffic.vue')
            },
            {
                path: '/search/localSearch',
                name: 'localSearch',
                component: () => import('@/views/search/local-search.vue')
            },
            {
                path: '/search/autoComplete',
                name: 'autoComplete',
                component: () => import('@/views/search/auto-complete.vue')
            },

            {
                path: '/contextMenu/contextMenu',
                name: 'contextMenu',
                component: () => import('@/views/context-menu/context-menu.vue')
            },
            {
                path: '/contextMenu/contextMenuItem',
                name: 'contextMenuItem',
                component: () => import('@/views/context-menu/context-menu-item.vue')
            },

            {
                path: '/tools/drawingManager',
                name: 'drawingManager',
                component: () => import('@/views/tools/drawing-manager.vue')
            },
            {
                path: '/tools/toolWrapper',
                name: 'toolWrapper',
                component: () => import('@/views/tools/tool-wrapper.vue')
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
