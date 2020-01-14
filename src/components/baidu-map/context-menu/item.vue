<template>
    <span>
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'bm-context-menu-item',
    props: {
        callback: {
            type: Function,
            default: function() {}
        },
        text: String,
        iconUrl: String,
        id: String,
        disabled: Boolean,
        seperator: Boolean
    },
    watch: {
        text() {
            this.reload();
        },
        iconUrl() {
            this.reload();
        },
        id() {
            this.reload();
        },
        disabled() {
            this.reload();
        },

        iseperator() {
            this.reload();
        },
        callback() {
            this.reload();
        }
    },
    destroyed() {
        this.reload();
    },
    mounted() {
        this.reload();
    },
    methods: {
        reload() {
            this.$parent.map && this.$parent.load();
        }
    }
};
</script>
