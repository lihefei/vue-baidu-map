<template>
    <div class="auto-complete">
        <slot>
            <div class="searchbar">
                <i></i>
                <input placeholder="搜索地址" />
            </div>
        </slot>
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
        types: Array
    },
    watch: {},
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
            })
            bindEvents.call(this, this.originInstance);
        }
    }
};
</script>

<style lang="scss" scoped>
.auto-complete {
    .searchbar {
        position: relative;
        i {
            $left: 10px;
            $size: 10px;
            $color: #ccc;
            position: absolute;
            left: $left;
            top: 50%;
            z-index: 1;
            width: $size;
            height: $size;
            border: 1px solid $color;
            border-radius: 50%;
            transform: translate(0, -$size/2 - 2px) rotate(135deg);

            &:after {
                content: '';
                position: absolute;
                left: 50%;
                top: 0;
                width: 0;
                height: 2px;
                border: 1px solid $color;
                transform: translate(-1px, -100%);
            }
        }

        input {
            height: 32px;
            padding: 0 15px 0 30px;
            border: 0;
            border-radius: 2px;
            font-size: 12px;
            line-height: 32px;
            background-color: #fff;
            outline: none;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

            &::placeholder {
                color: #999;
            }
        }
    }
}
</style>
