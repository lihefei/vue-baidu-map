<template>
    <div v-show="visible" class="map-popover" :style="{ transform: getOffset(offset)}">
        <span v-if="showClose" class="popover-close" @click="handleClose">&times;</span>
        <div v-if="$slots.header"  class="popover-header">
            <slot name="header"></slot>
        </div>
        <div class="popover-body">
            <slot></slot>
        </div>
        <div v-if="$slots.footer" class="popover-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mapPopover',
    components: {},
    props: {
        visible:  {
            type: Boolean,
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        beforeClose: Function,
        offset: Object
 
    },
    
    data() {
        return {
           
        };
    },
    watch: {
    },
    mounted() {
       
    },

    methods: {
        handleClose() {
            
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(this.hide)
            } else {
                this.hide();
            }
        },
        hide() {
           this.$emit('update:visible', false); 
           //this.$emit('close', e, this.$el);
        },
        getOffset(options) {
            let defaults = {
                width: 0,
                height: 0
            };
            
            let settings = Object.assign({}, defaults, options);
            let {width, height} = settings;
            
            let w = typeof width === 'number' ? width + 'px' : width;
            let h = typeof height === 'number' ? height + 'px' : height;
            
            return `translate(calc(-50% + ${w}), calc(0px + ${h}))`
        }
    }
};
</script>    
    
</script>

<style lang="scss" scoped>
.map-popover {
    $size: 8px;
    position: absolute;
    left: 50%;
    bottom: $size;
    min-width: 100px;
    min-height: 24px;
    border-radius: 4px;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, 0);

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 0;
        border-width: $size 6px 0;
        border-color: #fff transparent transparent;
        border-style: solid;
        transform: translate(-50%, 100%);
    }
    &::before {
        bottom: -1px;
        border-top-color: rgba(0, 0, 0, 0.1);
    }

    .popover-close {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        width: 18px;
        height: 18px;
        font-size: 18px;
        color: #999;
        text-align: center;
        line-height: 1;
        cursor: pointer;
        &:hover {
            color: rgb(221, 0, 0);
        }
    }
    
    .popover-header{
       
        padding: 8px 8px 0; 
        color: #666;
         font-weight: bold;
    }

    .popover-body {
        padding: 8px; 
    }
    
    .popover-footer {
       
        padding: 0 8px 8px;
    }

    .address-btn {
        cursor: pointer;
    }
}
</style>
