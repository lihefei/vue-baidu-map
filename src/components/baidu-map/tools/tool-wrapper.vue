<template>
   <div class="tool-wrapper">
       <slot></slot>
   </div>
</template>

<script>
export default {
    name: 'tool-wrapper',
    components: {},
    props: {
        BMap: Object,
        map: Object
    },
    data() {
        return {}
    },
    watch: {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.tool-wrapper {
    display: flex;
    align-items: center;
    min-width: 50px;
    min-height: 32px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
