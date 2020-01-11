<template>
    <div v-if="paths.length">
        <bm-polygon
            v-for="path of paths"
            :path="path"
            :stroke-color="strokeColor"
            :fillColor="fillColor"
            :strokeWeight="strokeWeight"
            :strokeOpacity="strokeOpacity"
            :fillOpacity="fillOpacity"
            :strokeStyle="strokeStyle"
            :massClear="massClear"
            :editing="editing"
            :clicking="clicking"
            @click="$emit('click', $event)"
            @dblclick="$emit('dblclick', $event)"
            @mousedown="$emit('mousedown', $event)"
            @mouseup="$emit('mouseup', $event)"
            @mouseout="$emit('mouseout', $event)"
            @mouseover="$emit('mouseover', $event)"
            @remove="$emit('remove', $event)"
        />
    </div>
</template>

<script>
import BuiduMapPolygon from '../overlays/polygon';
import commonMixin from '../base/mixins/common';
export default {
    name: 'bm-boundary',
    components: {
        'bm-polygon': BuiduMapPolygon
    },
    mixins: [commonMixin('abstract')],
    props: [
        'name',
        'strokeColor',
        'fillColor',
        'strokeWeight',
        'strokeOpacity',
        'fillOpacity',
        'strokeStyle',
        'massClear',
        'editing',
        'clicking'
    ],
    data() {
        return {
            paths: []
        };
    },
    watch: {
        name() {
            this.reload();
        }
    },
    mounted() {},
    methods: {
        load() {
            const { $parent, name } = this;

            const { BMap, map } = $parent;

            const bdary = new BMap.Boundary();

            bdary.get(name, data => {
                this.paths = data.boundaries.map(boundarie => {
                    return boundarie.split(';').map(point => {
                        return (([lng, lat]) => ({
                            lng,
                            lat
                        }))(point.split(',').map(p => +p));
                    });
                });
            });
        }
    }
};
</script>
