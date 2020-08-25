<template>
    <div class="level">当前缩放：{{ value }}级</div>
</template>
<script>
export default {
    name: 'bm-level',
    props: {
        value: Number,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.level {
    font-size: 11px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    color: #333;
}
</style>
