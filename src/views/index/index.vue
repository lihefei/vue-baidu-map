<template>
    <div class="index container is-vertical">
        <header class="header">
            <h3>百度地图组件</h3>
        </header>
        <section class="container">
            <side-menu />
            <main class="main">
                <router-view></router-view>
            </main>
        </section>
    </div>
</template>
<script>
import SideMenu from './components/side-menu/side-menu';
export default {
    name: 'index',
    components: {
        SideMenu
    }
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

    .main {
        flex: 1;
    }
}
</style>
