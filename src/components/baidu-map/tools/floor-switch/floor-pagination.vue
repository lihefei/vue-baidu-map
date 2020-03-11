<template>
    <div class="pagination" :class="{' pagination-vertical' : mode ==='vertical'}">
        <button
            type="button"
            :disabled="list && pageList[0] === current || !list && current === 1"
            class="btn-prev"
            @click="prevPage"
        >
            <i class="iconfont icon-arrow-left"></i>
        </button>
        <ul class="pager">
            <li
                v-for="(page, index) in pageList"
                :class="{
                        active: page === current && typeof page !== 'string', 
                        'more btn-quickprev': page === 'prev',
                        'more btn-quicknext': page === 'next'
                        }"
                @click="pagerClick(page)"
            >{{typeof page === 'number' ? page + suffix : '•••'}}</li>
        </ul>
        <button
            type="button"
            :disabled="list && pageList[pageList.length - 1] === current || !list && current === total"
            class="btn-next"
            @click="nextPage"
        >
            <i class="iconfont icon-arrow-right"></i>
        </button>
        <span class="go-page" v-if="showJumper && mode ==='horizontal'">
            前往&thinsp;
            <input
                ref="goPageInput"
                type="text"
                @blur="goPage($refs.goPageInput.value*1)"
            />&thinsp;楼
        </span>
    </div>
</template>

<script>
export default {
    name: 'bm-floor-pagination',
    props: {
        //分页列表
        list: Array,
        //总页数
        total: {
            type: Number,
            default: 1
        },
        //当前页
        currentPage: {
            type: Number,
            default: 1
        },
        //页码显示数量
        pagerCount: {
            type: Number,
            default: 7
        },
        //展示模式横向或竖向
        mode: {
            type: String,
            default: 'horizontal'
        },
        //分页跳转
        showJumper: {
            type: Boolean,
            default: false
        },
        //分页码后缀
        suffix: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            current: 1,
            sortList: [],
            pageList: [] //分页列表
        };
    },
    watch: {
        list: {
            handler() {
                this.getPageList(this.current);
            },
            deep: true
        },
        total() {
            this.getPageList(this.current);
        },
        currentPage(val) {
            this.current = val;
        },
        pagerCount() {
            this.getPageList(this.current);
        },
        current(val, old) {
            this.pageList = this.getPageList(val);
            this.$emit('current-change', val, old);
        }
    },
    mounted() {
        this.current = this.currentPage;
        this.pageList = this.getPageList(this.current);
    },
    methods: {
        getPageList(current) {
            let { list, total, pagerCount } = this;

            let pageList = [];

            //如果列表存在，优先使用列表数据
            if (Array.isArray(list)) {
                this.sortList = [...list].sort((n, m) => n - m); //排序列表生成临时列表
                let len = this.sortList.length; //列表总长度
                let index = this.sortList.indexOf(current); //当前页在列表中的下标

                //如果总页数在可显示页码数量以内，全部显示
                if (pagerCount > len - 1) {
                    pageList.push(...this.sortList);
                } else {
                    //如果总页数超过可显示页码数量，根据不同情况显示

                    //当前页能连到开始
                    if (index < pagerCount - 2) {
                        pageList.push(
                            ...this.sortList.slice(0, pagerCount - 1)
                        );
                        pageList.push('next');
                        pageList.push(this.sortList[len - 1]);
                    } else {
                        //当前页能连到结束
                        if (index > len - 1 - (pagerCount - 2)) {
                            pageList.push(this.sortList[0]);
                            pageList.push('prev');
                            pageList.push(
                                ...this.sortList.slice(
                                    len - (pagerCount - 1),
                                    len
                                )
                            );
                        } else {
                            //当前页不能连到结束
                            pageList.push(this.sortList[0]);
                            pageList.push('prev');
                            pageList.push(
                                ...this.sortList.slice(
                                    index - Math.floor((pagerCount - 2) / 2),
                                    index + Math.ceil((pagerCount - 2) / 2)
                                )
                            );
                            pageList.push('next');
                            pageList.push(this.sortList[len - 1]);
                        }
                    }
                }
            } else if (total) {
                //列表不存在则使用总数

                //如果总页数在可显示页码数量以内，全部显示
                if (pagerCount > total) {
                    for (let i = 1; i <= total; i++) {
                        pageList.push(i);
                    }
                } else {
                    //如果总页数超过可显示页码数量，根据不同情况显示

                    //当前页能连到开始
                    if (current < pagerCount - 1) {
                        for (let i = 1; i < pagerCount; i++) {
                            pageList.push(i);
                        }
                        pageList.push('next');
                        pageList.push(total);
                    } else {
                        //当前页能连到结束
                        if (current >= total - 1 - Math.floor(pagerCount / 2)) {
                            pageList.push(1);
                            pageList.push('prev');
                            for (
                                let i = total - (pagerCount - 2);
                                i <= total;
                                i++
                            ) {
                                pageList.push(i);
                            }
                        } else {
                            //当前页不能连到结束
                            pageList.push(1);
                            pageList.push('prev');

                            for (
                                let i =
                                    current - Math.floor((pagerCount - 2) / 2);
                                i <=
                                current + (Math.ceil((pagerCount - 2) / 2) - 1);
                                i++
                            ) {
                                pageList.push(i);
                            }

                            pageList.push('next');
                            pageList.push(total);
                        }
                    }
                }
            }

            return pageList;
        },
        /**
         * 上一页
         */
        prevPage() {
            if (this.list) {
                let index = this.sortList.indexOf(this.current);
                if (index > 0) {
                    this.current = this.sortList[index - 1];
                    this.$emit('prev-click', this.current);
                }
            } else {
                if (this.current > 1) {
                    this.current--;
                    this.$emit('prev-click', this.current);
                }
            }
        },
        /**
         * 下一页
         */
        nextPage() {
            if (this.list) {
                let index = this.sortList.indexOf(this.current);
                if (index < this.sortList.length - 1) {
                    this.current = this.sortList[index + 1];
                    this.$emit('prev-click', this.current);
                }
            } else {
                if (this.current < this.total) {
                    this.current++;
                    this.$emit('next-click', this.current);
                }
            }
        },
        /**
         * 分页点击
         * @param {Number} page 目标页面
         */
        pagerClick(page) {
            if (typeof page === 'number') {
                this.current = page;
                this.$emit('page-click', page);
            } else {
                let quickPage = 1;
                if (page === 'prev') {
                    if (this.list) {
                        let index = this.sortList.indexOf(this.current);
                        quickPage = this.sortList[
                            index - (this.pagerCount - 2)
                        ];
                        let firstPage = this.sortList[0];
                        quickPage < firstPage && (quickPage = firstPage);
                    } else {
                        quickPage = this.current - (this.pagerCount - 2);
                        quickPage < 1 && (quickPage = 1);
                    }
                }

                if (page === 'next') {
                    if (this.list) {
                        let idx = this.sortList.indexOf(this.current);
                        quickPage = this.sortList[idx + (this.pagerCount - 2)];
                        let lastPage = this.sortList[this.sortList.length - 1];
                        quickPage > lastPage && (quickPage = lastPage);
                    } else {
                        quickPage = this.current + (this.pagerCount - 2);
                        quickPage > this.total && (quickPage = this.total);
                    }
                }
                this.current = quickPage;

                this.$emit(`${page}-quick-click`, this.current);
            }
        },
        /**
         * 跳转页
         * @param {Number} page 目标页面
         */
        goPage(page) {
            let firstPage = 1;
            let lastPage = 1;

            if (this.list) {
                firstPage = this.sortList[0];
                lastPage = this.sortList[this.sortList.length - 1];
            } else {
                firstPage = 1;
                lastPage = this.total;
            }

            page < firstPage && (page = firstPage);
            page > lastPage && (page = lastPage);

            this.current = page;
            this.$refs.goPageInput.value = page;

            this.$emit('jumpe', page);
        }
    }
};
</script>

<style lang="scss" scoped>
.pagination {
    &,
    & * {
        box-sizing: border-box;
    }
    display: flex;

    .pager {
        display: flex;
        margin: 0;
        padding: 0;

        li {
            list-style: none;
            color: #606266;
            &:not(.disabled).active {
                color: #fff;
                background-color: #409eff;
                pointer-events: none;
                cursor: none;
            }
            &:hover {
                color: #409eff;
            }
        }
        .more {
            color: #999;
        }
    }

    .pager li,
    .btn-next,
    .btn-prev {
        min-width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
        cursor: pointer;
        user-select: none;
    }

    button {
        display: block;
        border: 0;
        font-weight: 600;
        color: #888;
        vertical-align: top;

        &:focus {
            outline: none;
            border: none;
        }
        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }
    }
    .btn-prev {
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
    }

    .btn-next {
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
    }
    .go-page {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        margin-right: 10px;
        input {
            width: 40px;
            height: 22px;
            line-height: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #606266;
            text-align: center;
            &:focus {
                outline: none;
            }
        }
    }
}

.pagination-vertical {
    flex-direction: column-reverse;

    .pager {
        flex-direction: column-reverse;
    }

    button {
        transform: rotate(-90deg);
    }

    .btn-prev {
        border-top-left-radius: 2px;
        border-bottom-right-radius: 0;
    }

    .btn-next {
        border-top-left-radius: 0;
        border-bottom-right-radius: 2px;
    }
}
</style>
