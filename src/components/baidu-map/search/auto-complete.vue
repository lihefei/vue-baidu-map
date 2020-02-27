<template>
    <div class="auto-complete">
        <input :value="value" :placeholder="placeholder" :class="inputClass" :style="inputStyle" />
    </div>
</template>
<script>
import commonMixin from '../base/mixins/common';
import bindEvents from '../base/bind-event'
export default {
    name: 'bm-auto-complete',
    mixins: [commonMixin()],
    props: {
        location: String,
        types: Array,
        inputStyle: Object,
        inputClass: String,
        placeholder: {
            type: String,
            default: '请输入搜索地址'
        },
        value:  {
            type: String,
            default: ''
        }
    },
    methods: {
        load() {
            const { BMap, map, $el, location, types, searchComplete } = this;
            const input = $el.querySelector('input');

            if (!input) {
                return;
            }

            this.originInstance = new BMap.Autocomplete({
                location: location || map,
                types,
                onSearchComplete: e => {
                    this.$emit('searchcomplete', e)
                },
                input
            });
            
            this.originInstance.addEventListener('onconfirm', e => {
                const val = e.item.value;
                const address = val.province + val.city + val.district + val.street + val.business;
                this.$emit('input', address);
                input.blur();
            })
            bindEvents.call(this, this.originInstance);
        }
    }
};
</script>

<style lang="scss" scoped>
.auto-complete {
    &,
    * {
        box-sizing: border-box;
    }
}
</style>
