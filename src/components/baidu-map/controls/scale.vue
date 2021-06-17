<script>
import commonMixin from '../base/mixins/common';
import { createSize } from '../base/factory';
export default {
    name: 'bm-scale',
    mixins: [commonMixin('control')],
    props: {
        offset: Object,
        anchor: String,
        unit: {
            type: String,
            default: 'metric', //单位制，"metric"表示米制，"us"表示美国传统单位，"nmile"表示海里
        },
    },
    data() {
        return {
            mapBinded: false,
        };
    },
    watch: {
        unit(val) {
            if (val === 'nmile') {
                this.bindMapEvent();
            } else {
                this.unbindMapEvent();
            }
        },
    },
    beforeDestroy() {
        this.unbindMapEvent();
    },
    methods: {
        load() {
            const { BMap, map, anchor, offset } = this;

            // 左上角，添加比例尺
            this.originInstance = new BMap.ScaleControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset),
            });

            map.addControl(this.originInstance);

            this.unit === 'nmile' && this.bindMapEvent();
        },
        //绑定地图事件
        bindMapEvent() {
            if (this.map && !this.mapBinded) {
                this.map.addEventListener('zoomend', this.formatScale);
                this.map.addEventListener('dragend', this.formatScale);
                this.map.addEventListener('moveend', this.formatScale);
                this.mapBinded = true;
            }
        },
        //解绑绑定地图事件
        unbindMapEvent() {
            if (this.map && this.mapBinded) {
                this.map.removeEventListener('zoomend', this.formatScale);
                this.map.removeEventListener('dragend', this.formatScale);
                this.map.removeEventListener('moveend', this.formatScale);
                this.mapBinded = false;
            }
        },
        //格式化比例尺内容
        formatScale() {
            setTimeout(() => {
                let scaleDom = document.querySelector('.BMap_scaleTxt'); //比例尺元素
                if (scaleDom && scaleDom.textContent) {
                    let scaleText = scaleDom.textContent; //获取比例尺文本内容
                    let arr = scaleText.split(/\s/); //以空格分隔出数值和单位
                    if (arr.length === 2) {
                        let distance = Number(arr[0]); //比例尺中的数值
                        let unitText = arr[1]; //比例尺中的单位

                        if (unitText !== '海里') {
                            if (unitText == '米') {
                                distance = distance / 1000; //如果是米先转换为公里
                            }

                            let dis = distance / 1.852; //把公里转换为海里，1海里等于1.852公里
                            dis = dis >= 100 ? dis.toFixed(0) : dis.toFixed(2); //如果大于等于100海里取整，小于100海里保留两位小时
                            scaleDom.innerHTML = Number(dis) + ' ' + '海里'; //把海里值转为数字的目的是当小数位后出现多余的0时省略，比如1.10格式化为1.1
                        }
                    }
                }
            }, 50);
        },
    },
    render() {},
};
</script>
