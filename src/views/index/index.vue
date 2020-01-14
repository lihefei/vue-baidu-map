<template>
    <div class="index container is-vertical">
        <header class="header">
            <h3>百度地图</h3>
        </header>
        <section class="container">
            <aside class="aside">
                <ul class="menu">
                    <li class="menu-item">
                        <router-link to="/map">基础地图</router-link>
                    </li>
                    <li class="submenu">
                        <div class="submenu-title">覆盖物</div>
                        <ul>
                            <li>
                                <router-link to="/overlays/marker">标记</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/label">标签</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/polyline">线段</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/circle">圆形</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/rectangle">矩形</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/polygon">多边形</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/boundary">行政区域</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/pointCollection">海量点</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/ground">地面覆盖物</router-link>
                            </li>
                            <li>
                                <router-link to="/overlays/overlay">自定义覆盖物</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="submenu">
                        <div class="submenu-title">控件</div>
                        <ul>
                            <li>
                                <router-link to="/controls/navigation">缩放条</router-link>
                            </li>

                            <li>
                                <router-link to="/controls/mapType">地图类型</router-link>
                            </li>
                            <li>
                                <router-link to="/controls/geolocation">本地定位</router-link>
                            </li>
                            <li>
                                <router-link to="/controls/cityList">城市列表</router-link>
                            </li>
                            <li>
                                <router-link to="/controls/overviewMap">缩略地图</router-link>
                            </li>
                            <li>
                                <router-link to="/controls/panorama">全景地图</router-link>
                            </li>
                            <li>
                                <router-link to="/controls/scale">标尺</router-link>
                            </li>
                            <li>
                                <router-link to="/controls/copyright">版权</router-link>
                            </li>
                            <li>
                                <router-link to="/controls/control">自定义控制器</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="submenu">
                        <div class="submenu-title">叠加层</div>
                        <ul>
                            <li>
                                <router-link to="/layers/tile">瓦片</router-link>
                                <router-link to="/layers/traffic">交通流量</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="submenu">
                        <div class="submenu-title">搜索</div>
                        <ul>
                            <li>
                                <router-link to="/search/localSearch">本地商圈</router-link>
                            </li>
                            <li>
                                <router-link to="/search/autoComplete">自动完成</router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="submenu">
                        <div class="submenu-title">右键菜单</div>
                        <ul>
                            <li>
                                <router-link to="/contextMenu/contextMenu">菜单</router-link>
                            </li>
                            <li>
                                <router-link to="/contextMenu/contextMenuItem">菜单项</router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="submenu">
                        <div class="submenu-title">工具</div>
                        <ul>
                            <li>
                                <router-link to="/tools/drawingManager">绘图</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>
            <main class="main">
                <router-view></router-view>
            </main>
        </section>
    </div>
</template>
<script>
export default {
    name: 'index'
};
</script>
<style lang="scss" scoped>
.container {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-basis: auto;
    flex-direction: row;
}
.is-vertical {
    flex-direction: column;
}
.index {
    height: 100%;

    .header {
        height: 60px;
        background-color: #0854a2;

        h3 {
            margin: 0;
            padding: 0 25px;
            color: #fff;
            line-height: 60px;
        }
    }

    .aside {
        width: 260px;
        max-height: 800px;
        overflow: hidden;
        overflow-y: auto;

        background-color: #dee7ff;
        ul {
            padding: 0;
        }
        li {
            list-style: none;
        }

        .menu {
            .submenu-title,
            a {
                display: block;
                padding: 5px 20px;
                line-height: 34px;
                text-decoration: none;
                color: #666;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.5);
                }
            }

            ul {
                a {
                    padding-left: 40px;
                }
            }
        }
    }

    .main {
        flex: 1;
    }
}
</style>
