<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event';
import { createSize, createIcon, createPoint, createLabel } from '../base/factory';
export default {
    name: 'bm-marker',
    mixins: [commonMixin('overlay')],
    props: {
        position: {},
        offset: {},
        icon: {},
        shadow: {},
        massClear: {
            type: Boolean,
            default: true,
        },
        dragging: {
            type: Boolean,
            default: false,
        },
        clicking: {
            type: Boolean,
            default: true,
        },
        raiseOnDrag: {
            type: Boolean,
            default: false,
        },
        draggingCursor: String,
        rotation: Number,
        title: String,
        top: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: 0,
        },
        label: Object,
    },
    watch: {
        'position.lng': function(val, oldVal) {
            const { BMap, position, originInstance } = this;
            if (val !== oldVal && val >= -180 && val <= 180) {
                let point = createPoint(BMap, { lng: val, lat: position.lat });
                originInstance.setPosition(point);
            }
        },
        'position.lat': function(val, oldVal) {
            const { BMap, position, originInstance } = this;
            if (val !== oldVal && val >= -90 && val <= 90) {
                let point = createPoint(BMap, { lng: position.lng, lat: val });
                originInstance.setPosition(point);
            }
        },
        'offset.width': function(val, oldVal) {
            const { BMap, offset, originInstance } = this;
            if (val !== oldVal) {
                let size = createSize(BMap, { width: val, lat: offset.height });
                originInstance.setOffset(size);
            }
        },
        'offset.height': function(val, oldVal) {
            const { BMap, offset, originInstance } = this;
            if (val !== oldVal) {
                let size = createSize(BMap, {
                    width: offset.width,
                    height: val,
                });
                originInstance.setOffset(size);
            }
        },
        icon: {
            handler(val, old) {
                if (JSON.stringify(val) !== JSON.stringify(old)) {
                    const { BMap, originInstance, rotation } = this;
                    originInstance && originInstance.setIcon(createIcon(BMap, val));
                    originInstance && rotation && originInstance.setRotation(rotation);
                }
            },
            deep: true,
        },
        massClear(val) {
            val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
        },
        dragging(val) {
            val ? this.originInstance.enableDragging() : this.originInstance.disableDragging();
        },
        clicking() {
            this.reload();
        },
        raiseOnDrag() {
            this.reload();
        },
        draggingCursor(val) {
            this.originInstance.setDraggingCursor(val);
        },
        rotation(val) {
            this.originInstance.setRotation(val);
        },
        shadow(val) {
            this.originInstance.setShadow(val);
        },
        title(val) {
            this.originInstance.setTitle(val);
        },
        top(val) {
            this.originInstance.setTop(val);
        },
        zIndex(val) {
            this.originInstance.setZIndex(val);
        },
        'label.content': function(val) {
            if (this.labelInstance) {
                this.labelInstance.setContent(val);
            }
        },
        'label.opts': function(val, old) {
            if (JSON.stringify(val) !== JSON.stringify(old)) {
                this.labelInstance = createLabel(this.BMap, this.label);
                this.originInstance.setLabel(this.labelInstance);
            }
        },
        'label.labelStyle': function(val, old) {
            if (this.labelInstance && JSON.stringify(val) !== JSON.stringify(old)) {
                this.labelInstance.setStyle(labelStyle);
            }
        },
        'label.labelClass': function(val) {
            if (this.labelInstance && this.labelInstance.ca) {
                this.originInstance.ca.classList.forEach((clas) => {
                    if (clas !== 'BMapLabel') {
                        this.originInstance.ca.classList.remove(clas);
                    }
                });
                this.originInstance.ca.classList.add(val);
            }
        },
    },
    mounted() {},
    methods: {
        load() {
            const {
                $parent,
                position,
                offset,
                icon,
                massClear,
                dragging,
                clicking,
                raiseOnDrag,
                draggingCursor,
                rotation,
                shadow,
                title,
                top,
                zIndex,
                label,
            } = this;
            const { BMap, map } = $parent;
            this.BMap = BMap;
            this.map = map;
            let point = createPoint(BMap, position);

            const overlay = new BMap.Marker(point, {
                offset,
                icon: icon && createIcon(BMap, icon),
                enableMassClear: massClear,
                enableDragging: dragging,
                enableClicking: clicking,
                raiseOnDrag,
                draggingCursor,
                rotation,
                shadow,
                title,
            });

            this.originInstance = overlay;
            if (label && overlay) {
                this.labelInstance = createLabel(BMap, label);
                overlay.setLabel(this.labelInstance);
                if (label.labelClass) {
                    setTimeout(() => {
                        if (this.labelInstance.ca) {
                            this.labelInstance.ca.classList.forEach((clas) => {
                                if (clas !== 'BMapLabel') {
                                    labelInstance.ca.classList.remove(clas);
                                }
                            });
                            this.labelInstance.ca.classList.add(label.labelClass);
                        }
                    }, 0);
                }
            }
            overlay.setTop(top);
            overlay.setZIndex(zIndex);
            bindEvents.call(this, overlay);

            map.addOverlay(overlay);
        },
    },
};
</script>
