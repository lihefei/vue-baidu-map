<template>
<bm-tool-wrapper  v-if="map" :map="map" :BMap="BMap">
    <div class="search-bar">
        <i class="css-icon-search"></i>
        <bm-auto-complete input-class="search-input" :value="value" :placeholder="placeholder" @searchcomplete="autoSearchComplete" @input="autoSearchInput" />
        <i v-if="value" class="css-icon-close" @click="clearInput"></i>
        <i v-if="loading" class="css-icon-loader"></i>
    </div>
    <bm-local-search
        v-if="keyword"
        :keyword="keyword"
        :selectFirstResult="true"
        @searchcomplete="localSearchComplete"
    ></bm-local-search>
</bm-tool-wrapper>
</template>
<script>
import BaiduToolWrapper from './tool-wrapper'; //工具包装器
import BuiduAutoComplete from '../search/auto-complete'; //自动完成
import BuiduLocalSearch from '../search/local-search'; //本地搜索
export default {
    name: 'bm-search-bar',
    components: {
        'bm-tool-wrapper': BaiduToolWrapper,
        'bm-auto-complete': BuiduAutoComplete,
        'bm-local-search': BuiduLocalSearch
    },
    props: {
        map: Object,
        BMap: Object,
        location: String,
        types: Array,
        placeholder: String
    },
    data() {
        return {
            value: '',
            keyword: '',
            loading: false
        };
    },
    watch: {},
    methods: {
        autoSearchComplete(e) {
            this.$emit('searchcomplete', e);
        },
        autoSearchInput(val) {
            this.keyword = val;
            this.loading = true;
        },
        localSearchComplete(e) {
            if (e) {
                this.value = e.keyword;
                let firstPoi = e.getPoi(0);
                this.$emit('confirm', firstPoi);
            }
            this.loading = false;
        },
        clearInput() {
            this.value = '';
            this.$emit('clear');
        }
        
    }
};
</script>

<style lang="scss" scoped>
.search-bar {
    &,
    * {
        box-sizing: border-box;
    }
    position: relative;
    $size: 12px;
    $color: rgba(0,0,0,.3);
    .css-icon-search,
    .css-icon-close {
        
        position: absolute;
        top: 50%;
        z-index: 1;
        border: 1px solid $color;
        border-radius: 50%;
    }
    
    .css-icon-search {
        left: $size;
         width: $size;
        height: $size;
        transform: translate(0, -$size/2 - 1px) rotate(135deg);

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

    &:hover {
        .css-icon-close {
            display: block;
            
        }
        
    }

    .css-icon-close {
        display: none;
        width: $size;
        height: $size;
        right: $size;
        background-color: #fff;
        transform: translate(0, -($size)/2);
        cursor: pointer;
        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 2px;
            width: 0;
            height: $size - 6;
            border: solid $color;
            border-width: 0 1px 0 0;
            
        }
        &::before {
            transform:  rotate(135deg);
        }
        &::after {
            transform: rotate(-135deg);
        }
    }

    
    .css-icon-loader {
        position: absolute;
        right: $size;
        top: 50%;
        width: $size;
        height: $size;
        transform: translate(0, -$size/2 );
    }
    .css-icon-loader:before,
    .css-icon-loader:after {
        content: '';
        position: absolute;
        top: -25%;
        left: -25%;
        width: inherit;
        height: inherit;
        border: .2em solid rgba(0,0,0,.2);
        border-radius: 50%;
        animation: loader 1s linear infinite;
        opacity: 0;
        transform: translate(-$size/2, -$size/2);
    }
    .css-icon-loader:before {
        animation-delay: 1s;
    }
    .css-icon-loader:after {
        animation-delay: .5s;
    }
    @keyframes loader {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }
}
::v-deep .search-input {
    display: block;
    width: 100%;
    height: 32px;
    padding: 0 15px 0 30px;
    border: 0;
    font-size: 12px;
    line-height: 32px;
    background-color: transparent;
    outline: none;
    &::placeholder {
        color: #999;
    }
}
</style>
