<template>
    <aside class="aside" ref="asideMenu">
        <ul class="menu">
            <li
                v-for="item in menu"
                :class="{
                    submenu: item.children, 
                    'menu-item': !item.children,
                    active: !item.children && active === item.url 
                }"
            >
                <template v-if="item.children">
                    <div class="submenu-title" @click="expandCollapse($event)">
                        <i class="iconfont icon-arrow-up"></i>
                        <i :class="`iconfont icon-${item.icon}`"></i>
                        {{ item.title }}
                    </div>
                    <ul>
                        <li
                            v-for="subItem in item.children"
                            :class="{active: active === subItem.url}"
                        >
                            <router-link :to="subItem.url">{{ subItem.title }}</router-link>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <router-link :to="item.url">
                        <i :class="`iconfont icon-${item.icon}`"></i>
                        {{ item.title }}
                    </router-link>
                </template>
            </li>
        </ul>
    </aside>
</template>
<script>
import menuData from './menu.json';
export default {
    name: 'SideMenu',
    data() {
        console.log(menuData);
        return {
            menu: menuData,
            active: ''
        };
    },
    watch: {
        '$route.path': function(val) {
            this.active = val;
        }
    },
    mounted() {
        this.active = this.$route.path;
        this.sideHeight();

        window.onresize = () => {
            this.sideHeight();
        };
    },
    methods: {
        /**
         * 菜单容器高度计算
         */
        sideHeight() {
            let wh = window.innerHeight;
            let th = document.querySelector('header').clientHeight;
            this.$refs.asideMenu.style.height = wh - th + 'px';
        },
        /**
         * 展开收起子菜单
         * @param {MouseEvent} event
         */
        expandCollapse(event) {
            let targetEle = event.target;
            let nextEle = targetEle.nextElementSibling;
            let arrowEle = targetEle.querySelector('[class*=icon-arrow]');
            let hide = window.getComputedStyle(nextEle).display === 'none';

            nextEle.style.display = hide ? 'block' : 'none';

            let classList = arrowEle.classList;
            if (hide) {
                classList.remove('icon-arrow-down');
                classList.add('icon-arrow-up');
            } else {
                classList.remove('icon-arrow-up');
                classList.add('icon-arrow-down');
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.aside {
    width: 260px;
    overflow: hidden;
    overflow-y: auto;
    border-right: 1px solid #c3ceec;
    //background-color: #dee7ff;
    background-color: #eff3ff;
    box-shadow: 3px 0 3px rgba(0, 0, 0, 0.3);
    ul {
        padding: 0;
    }
    li {
        list-style: none;
    }

    .menu {
        .active {
            $color: #becefd;
            background-color: $color;
            a:hover {
                background-color: $color;
            }
        }
        .submenu {
            ul {
                //background-color: #d1deff;
                background-color: #fff;
            }
        }
        .submenu-title,
        a {
            display: block;
            padding: 5px 20px;
            line-height: 34px;
            text-decoration: none;
            color: #666;
            cursor: pointer;

            &:hover {
                background-color: rgba(255, 255, 255, 0.5);
            }
        }

        .iconfont {
            margin-right: 8px;
            font-size: 20px;
            vertical-align: middle;
        }

        .icon-arrow-up,
        .icon-arrow-down {
            float: right;
            pointer-events: none;
        }

        ul {
            a {
                padding-left: 40px;
            }
        }
    }
}
</style>
