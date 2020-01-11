<template>
    <div class="device-container">
        <ul class="device-info">
            <li>
                <div class="key">名称：</div>
                <div class="value full">田七(1001)</div>
                <div class="status 0">离线</div>
            </li>
            <li>
                <div class="key">定位：</div>
                <div class="value full">BDS(RTK定位)</div>
            </li>
            <li>
                <div class="key">速度：</div>
                <div class="value">10km/h</div>
                <div class="key">方向：</div>
                <div class="value">西北</div>
            </li>
            <li>
                <div class="key">时间：</div>
                <div class="value full">2020-01-06 18:20:31</div>
            </li>
            <li>
                <div class="key">地址：</div>
                <div class="value full"><a class="address-btn">获取地址</a></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'device-info',
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.device-container {
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    .device-info {
        width: 220px;
        position: relative;
        margin: 0;
        padding: 0;
        li {
            overflow: hidden;
            line-height: 16px;
            list-style: none;

            .key,
            .value {
                float: left;
                padding: 2px;
            }
            .key {
                width: 50px;
                text-align: right;
            }
            .value {
                width: 50px;
                color: #666;
            }
            .full {
                width: auto;
                float: none;
                margin-left: 50px;
            }

            .status {
                position: absolute;
                right: 10px;
                top: 2px;
                padding: 0 4px;
                border-radius: 2px;
                color: #fff;
                background-color: #999;
            }
            .online {
                background-color: #0c0;
            }
        }
    }
}
</style>
