<template>
    <div class="tool" :class="{ active: isOpen }" :title="text" @click="toolClick">
        <i class="iconfont icon-ruler"></i>
        <span v-if="showText">&nbsp;{{ text }}</span>
    </div>
</template>
<script>
export default {
    name: 'bm-tool-distance',
    props: {
        map: Object,
        BMap: Object,
        text: {
            type: String,
            default: '测距',
        },
        showText: {
            type: Boolean,
            default: false,
        },
        unit: {
            type: String,
            default: 'metric', //测距结果所用的单位制，可接受的属性为"metric"表示米制和"us"表示美国传统单位和"nmile"表示海里(海里的千分之一)
        },
        options: {
            type: Object,
            default() {
                return {
                    tips: '测距', // 测距提示
                    followText: '单击确定地点，双击结束', //测距过程中，提示框文字
                    lineColor: '#ff6319', //折线颜色
                    lineStroke: 2, //折线线宽
                    opacity: 0.8, // 折线透明度
                    lineStyle: 'solid', //折线样式
                    cursor: './baidu-map/images/ruler.cur', //跟随鼠标样式
                    secIcon: null, //转折点的ICON样式
                    closeIcon: null, //关闭的ICON样式
                };
            },
        },
    },
    data() {
        return {
            mapConfig: {
                map: null,
                BMap: null,
                mapContainer: null,
                mapBinded: false,
                mapMoving: false,
            },
            points: [], //折线包含所有点的数组
            paths: [], //折线所包含的所有path数组
            dots: [], //折线结点图片数组
            followLabel: null, //跟随的label覆盖物
            followLabelStartText: '单击确定起点',
            overlays: [], //覆盖物的数组
            enableMassClear: true, //是否在调用map.clearOverlays清除画线需要建立的相关overlay元素
            movingTimerId: null, //地图移动的计时器
            segDistance: [], //折线测距包含所有线段的距离
            operationMask: {
                element: null, //透明操作层dom元素
                inUse: false, //透明操作层是否在使用中
            },
            units: {
                // metric 表示米制
                metric: {
                    name: 'metric', //米制的名称
                    conv: 1, //和米制的换算关系
                    incon: 1000, //米制单位下两个单位制之间的换算关系
                    u1: '米', //米制单位下较小单位
                    u2: '公里', //米制单位下较大单位
                },
                // us 表示美国传统单位，各参数意义同上metric
                us: {
                    name: 'us',
                    conv: 3.2808,
                    incon: 5279.856,
                    u1: '英尺',
                    u2: '英里',
                },
                //海里
                nmile: {
                    name: 'nmile',
                    conv: 0.00054,
                    incon: 1,
                    u1: '海里', //海里的千分之一
                    u2: '海里',
                },
            },
            styles: {
                BMapLib_diso: 'height:17px;width:5px;position:absolute;background:url(./baidu-map/images/dis_box_01.gif) no-repeat left top',
                BMapLib_disi:
                    'color:#7a7a7a;position:absolute;left:5px;padding:0 4px 1px 0;line-height:17px;background:url(./baidu-map/images/dis_box_01.gif) no-repeat right top',
                BMapLib_disBoxDis: 'color:#ff6319;font-weight:bold',
            },
            isOpen: false,
        };
    },

    watch: {
        map(map) {
            this.mapConfig.map = map;
            if (map) {
                this.mapConfig.mapContainer = map.getContainer();
            }
        },
        BMap(BMap) {
            this.mapConfig.BMap = BMap;
        },
        isOpen(val) {
            if (val) {
                this.open();
            } else {
                this.close();
            }
        },
    },
    mounted() {
        this.mapConfig.map = this.map;
        this.mapConfig.BMap = this.BMap;
        this.mapConfig.map && (this.mapConfig.mapContainer = this.mapConfig.map.getContainer());
    },
    methods: {
        toolClick() {
            this.isOpen = !this.isOpen;
        },
        open() {
            // 判断是否是否在移动过程中
            if (this.mapConfig.mapMoving) {
                delete this.mapConfig.mapMoving;
            }

            // 增加鼠标在地图区域移动的事件
            // 通过mapBind参数，避免多次绑定
            if (!this.mapConfig.mapBinded) {
                this.mapConfig.mapBinded = true;

                // 绑定控件项事件
                this.mapBind();

                // 地图的移动过程中，需要隐藏相关的提示框
                this.map.addEventListener('moving', () => {
                    this.hideCurrent();
                });
            }

            // 将文字提示框作为BMap.Label元素，提交给Map Api进行管理
            if (this.followLabel) {
                this.map.addOverlay(this.followLabel);
                this.followLabel.hide();
            }

            // 初始化存储数据
            this.initData();

            // 调整followLabel的内容
            this.formatLabel();

            // 创建透明覆盖层，并设置鼠标样式
            this.showMask();
            this.setMaskCursor(this.options.cursor);

            //开始时绑定事件
            this.bindAllEvent();
        },

        //绑定所有事件
        bindAllEvent() {
            let maskDom = this.operationMask.dom;
            maskDom.addEventListener('click', this.distClick);
            maskDom.addEventListener('mousemove', this.distMove);
            maskDom.addEventListener('dblclick', this.distDblclick);
            maskDom.addEventListener('keydown', this.distKeyDown);
            maskDom.addEventListener('mouseup', this.distMouseUp);
        },

        //解绑所有事件
        unbindAllEvent() {
            let maskDom = this.operationMask.dom;
            maskDom.removeEventListener('click', this.distClick);
            maskDom.removeEventListener('mousemove', this.distMove);
            maskDom.removeEventListener('dblclick', this.distDblclick);
            maskDom.removeEventListener('keydown', this.distKeyDown);
            maskDom.removeEventListener('mouseup', this.distMouseUp);
        },

        // 地图区域的移动事件绑定
        mapBind() {
            this.mapConfig.mapContainer.addEventListener('mousemove', (e) => {
                if (!this.isOpen || !this.followLabel) {
                    return;
                }
                e = window.event || e;
                let t = e.target || e.srcElement;

                // 如果触发该事件的页面元素不是遮盖效果层，则返回，无操作
                if (t != this.operationMask.dom) {
                    this.followLabel.hide();
                    return;
                }

                if (!this.mapConfig.mapMoving) {
                    this.followLabel.show();
                }

                let pt = this.getDrawPoint(e, true);
                this.followLabel.setPosition(pt);
            });

            // 创建鼠标跟随的文字提示框
            if (this.followLabelStartText) {
                this.followLabel = new this.BMap.Label(this.followLabelStartText, { offset: new this.BMap.Size(14, 16) });
                this.followLabel.setStyles({ color: '#333', borderColor: '#ff0103' });
            }
        },

        /**
         * 测距过程中，点击地图时，触发的操作
         * @ignore
         * @param {Object} e event对象
         */
        distClick(e) {
            if (!this.isOpen) {
                return;
            }
            // 通过event对象，计算得出点击位置的物理坐标，poi为一个BMap.Point对象
            e = window.event || e;
            let poi = this.getDrawPoint(e, true);
            // 验证计算得出的该点的位置合理性
            if (!this.isPointValid(poi)) {
                return;
            }
            // 记录当前点的屏幕位置
            this.mapBind.initX = e.pageX || e.clientX || 0;
            this.mapBind.initY = e.pageY || e.clientY || 0;

            // 这个if循环内的计算是，判断当前这个点，与存储内的最后一个点的距离，
            // 如果距离过小，比如小于5，可以认为是用户的误点，可以忽略掉
            if (this.points.length > 0) {
                let lstPx = this.map.pointToPixel(this.points[this.points.length - 1]);
                let thisPx = this.map.pointToPixel(poi);
                let dis = Math.sqrt(Math.pow(lstPx.x - thisPx.x, 2) + Math.pow(lstPx.y - thisPx.y, 2));
                if (dis < 5) {
                    return;
                }
            }

            this.mapBind.x = e.layerX || e.offsetX || 0;
            this.mapBind.y = e.layerY || e.offsetY || 0;
            this.points.push(poi);
            // 添加测距结点
            this.addSecPoint(poi);

            // 调整跟踪鼠标的标签
            if (this.paths.length == 0) {
                this.formatLabel(1, this.options.followText, this.getTotalDistance());
            }

            // 修改确定线的颜色
            if (this.paths.length > 0) {
                this.paths[this.paths.length - 1].show();
                this.paths[this.paths.length - 1].setStrokeOpacity(this.options.opacity);
            }

            let path = new this.BMap.Polyline([poi, poi], { enableMassClear: this.enableMassClear });
            this.map.addOverlay(path);
            this.paths.push(path);
            this.overlays.push(path);

            // 测距模式下线样式固定
            path.setStrokeWeight(this.options.lineStroke);
            path.setStrokeColor(this.options.lineColor);
            path.setStrokeOpacity(this.options.opacity / 2);
            path.setStrokeStyle(this.options.lineStyle);

            // 如果地图正在移动则隐藏掉
            if (this.mapConfig.mapMoving) {
                path.hide();
            }

            if (this.points.length > 1) {
                let siblingPath = this.paths[this.points.length - 2];
                siblingPath.setPositionAt(1, poi);
            }

            // 生成节点旁边的距离显示框
            let disText = '';
            if (this.points.length > 1) {
                // 非起点的节点，显示当前的距离
                this.setSegDistance(this.points[this.points.length - 2], this.points[this.points.length - 1]);
                let meters = this.getTotalDistance();
                disText = this.formatDisStr(meters);
            } else {
                disText = '起点';
            }
            let disLabel = new this.BMap.Label(disText, { offset: new this.BMap.Size(10, -5), enableMassClear: this.enableMassClear });
            disLabel.setStyles({ color: '#333', borderColor: '#ff0103' });
            this.map.addOverlay(disLabel);
            this.formatSegLabel(disLabel, disText);
            this.overlays.push(disLabel);
            poi.disLabel = disLabel;
            disLabel.setPosition(poi);
        },

        /**
         * 测距过程中，鼠标在地图上移动时，触发的操作
         * @ignore
         * @param {Object} e event对象
         */
        distMove(e) {
            if (!this.isOpen) {
                return;
            }
            // 通过判断数组this.paths的长度，判断当前是否已经有测量节点
            // 也就是，如果没有节点，则还没有开始测量
            if (this.paths.length > 0) {
                // 通过event参数，计算当前点的位置
                e = window.event || e;
                var curX = e.pageX || e.clientX || 0;
                var curY = e.pageY || e.clientY || 0;
                if (typeof this.mapBind.initX == 'undefined') {
                    this.mapBind.x = e.layerX || e.offsetX || 0;
                    this.mapBind.y = e.layerY || e.offsetY || 0;
                    this.mapBind.initX = curX;
                    this.mapBind.initY = curY;
                }
                var x = this.mapBind.x + curX - this.mapBind.initX;
                var y = this.mapBind.y + curY - this.mapBind.initY;

                // 修改最后一条折线的终点位置，使之随着鼠标移动画线
                var path = this.paths[this.paths.length - 1];
                var poi = this.map.pixelToPoint(new this.BMap.Pixel(x, y));
                path.setPositionAt(1, poi);

                if (!this.mapConfig.mapMoving) {
                    path.show();
                }
                var dx = 0;
                var dy = 0;
                // 计算当前鼠标位置，是否靠近边界、或者已经出了边界
                // 如果在边界位置，则需要向对应的方向移动地图，来进行测量
                // 每次移动的距离，设定为8
                if (x < 10) {
                    dx = 8;
                } else if (x > this.map.getSize().width - 10) {
                    dx = -8;
                }
                if (y < 10) {
                    dy = 8;
                } else if (y > this.map.getSize().height - 10) {
                    dy = -8;
                }
                // 如果dx和dy都等于0，表明不需要移动地图
                if (dx != 0 || dy != 0) {
                    // 此时需要向一个方向，平移地图
                    if (!this.distMove.movingTimerId) {
                        this.mapConfig.mapMoving = true;
                        this.map.panBy(dx, dy, { noAnimation: true });
                        this.movingTimerId = this.distMove.movingTimerId = setInterval(() => {
                            this.map.panBy(dx, dy, { noAnimation: true });
                        }, 30);
                        // 地图移动过程中，隐藏线段和标签
                        path.hide();
                        this.followLabel && this.followLabel.hide();
                    }
                } else {
                    if (this.distMove.movingTimerId) {
                        // 此时用户不在需要移动地图来测量，可以清除计时器
                        clearInterval(this.distMove.movingTimerId);
                        delete this.distMove.movingTimerId;
                        delete this.movingTimerId;

                        // 显示跟随提示框，并修改线路位置
                        var lstP = this.paths[this.paths.length - 1];
                        var poiN = this.map.pixelToPoint(new this.BMap.Pixel(x, y));
                        if (!lstP) {
                            return;
                        }
                        lstP.setPositionAt(1, poiN);
                        lstP.show();
                        if (this.followLabel) {
                            this.followLabel.setPosition(poiN);
                            this.followLabel.show();
                        }
                        this.mapBind.i = 0;
                        this.mapBind.j = 0;
                        delete this.mapConfig.mapMoving;
                    }
                }
                // 实时更新文字提示框中的距离
                if (this.followLabel) {
                    var td = this.getTotalDistance();
                    var dis = this.map.getDistance(this.points[this.points.length - 1], poi);
                    this.updateInstDis(this.followLabel, td + dis);
                }
            } else {
                // 此时用户还没有开始测量，只是鼠标随便在地图上移动
                if (this.followLabel) {
                    this.followLabel.show();
                    e = window.event || e;
                    var t = e.target || e.srcElement;
                    if (t != this.operationMask.dom) {
                        this.followLabel.hide();
                    }
                }
            }
        },

        /**
         * 测距要结束时，双击地图，触发的操作
         * @ignore
         * @param {Object} e event对象
         */
        distDblclick(e) {
            if (!this.isOpen) {
                return;
            }
            // 结束时，删除绑定的事件
            this.unbindAllEvent();

            // 调用close()关闭测距状态
            setTimeout(() => {
                this.close();
            }, 50);
        },

        /**
         * 测距时的键盘操作
         * @ignore
         * @param {Object} e event对象
         */
        distKeyDown(e) {
            e = window.event || e;
            if (e.keyCode == 27) {
                // [ESC]退出本次测距
                this.clearCurData();
                setTimeout(() => {
                    this.close();
                }, 50);
            }
        },

        /**
         * 测距过程中，鼠标弹起时，触发的操作
         * @ignore
         * @param {Object} e event对象
         */
        distMouseUp(e) {
            e = window.event || e;
            var ieVersion = 0;
            if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
                ieVersion = document.documentMode || +RegExp['\x241'];
            }
            if ((ieVersion && e.button != 1) || e.button == 2) {
                this.close();
            }
        },

        //显示透明覆盖层
        showMask() {
            this.operationMask.inUse = true;
            !this.operationMask.dom && this.createMask();
            this.operationMask.dom.style.display = 'block';
        },

        //隐藏透明覆盖层
        hideMask() {
            if (!this.map) {
                return;
            }
            this.operationMask.inUse = false;
            if (this.operationMask.dom) {
                this.operationMask.dom.style.display = 'none';
            }
        },
        // 创建透明覆盖层
        createMask() {
            let mapContainer = this.mapConfig.mapContainer;
            mapContainer.insertAdjacentHTML(
                'beforeend',
                "<div style='background:transparent url(./baidu-map/images/blank.gif);position:absolute;left:0;top:0;width:100%;height:100%;z-index:1000' unselectable='on'></div>"
            );
            let elem = (this.operationMask.dom = mapContainer.lastChild);

            elem.addEventListener('mouseup', (e) => {
                if (e.button == 2) {
                    e.preventDefault();
                }
            });
            elem.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });

            elem.style.display = 'none';
        },
        /**
         * 调整分段距离样式
         * @param {BMap.Label} label 提示框的Label
         * @param {String} 需要填入的文字
         * @return 没有返回值
         */
        formatSegLabel(label, text) {
            label.setStyle({ border: 'none', padding: '0' });
            label.setContent(
                "<span style='" + this.styles.BMapLib_diso + "'><span style='" + this.styles.BMapLib_disi + "'>" + text + '</span></span>'
            );
        },
        /**
         * 更新label的距离
         * @param HTMLElement label的DOM元素
         * @param Number 距离
         */
        updateInstDis(label, distance) {
            // 换算距离
            var u = this.unit;
            var dis = this.convertUnit(distance, u);
            var unit = this.units[u].u1;
            if (dis > this.units[u].incon) {
                dis = dis / this.units[u].incon;
                unit = this.units[u].u2;
                dis = dis.toFixed(1);
            } else {
                dis = dis.toFixed(1);
            }

            // 修改Label的内容
            if (label) {
                var htmls = [];
                htmls.push("<span>总长：<span style='" + this.styles.BMapLib_disBoxDis + "'>" + Number(dis) + '</span>' + unit + '</span><br />');
                htmls.push("<span style='color:#7a7a7a'>" + this.options.followText + '</span>');
                label.setContent(htmls.join(''));
            }
        },

        hideCurrent() {
            if (!this.isOpen) {
                return;
            }

            if (this.paths.length > 0) {
                let p = this.paths[this.paths.length - 1];
                p.hide();
            }
            this.followLabel && this.followLabel.hide();
        },

        setMaskCursor(cursor) {
            // 由于webkit内核浏览器下，cursor设置后默认不会居中，所以需要对偏移值进行设置
            let csr = /webkit/.test(navigator.userAgent.toLowerCase()) ? `url(${cursor}) 3 6, crosshair` : `url(${cursor}), crosshair`;

            if (this.operationMask.dom) {
                this.operationMask.dom.style.cursor = csr || 'default';
            }
        },
        /**
         * 生成测距过程中的文字提示框
         * @param {String} type
         * @param {String} text
         * @param {String} distance
         * @param {Label} label
         * @return 无返回值
         */
        formatLabel(type, text, distance, label) {
            let title = label || this.followLabel;
            if (!title) {
                return;
            }
            title.setStyle({ lineHeight: '16px', zIndex: '85', padding: '3px 5px' });
            var t = this.followLabelStartText || '';
            var htmls = [];
            if (type == 1) {
                // 测距过程中的提示
                title.setOffset(0, 25);
                var u = this.unit;
                var unit = this.units[u].u1;
                var dis = this.convertUnit(distance, u);
                if (dis > this.units[u].incon) {
                    dis = dis / this.units[u].incon;
                    unit = this.units[u].u2;
                    dis = dis.toFixed(1);
                } else {
                    dis = dis.toFixed(1);
                }
                htmls.push("<span>总长：<span style='" + this.styles.BMapLib_disBoxDis + "'>" + Number(dis) + '</span>' + unit + '</span><br />');
                htmls.push("<span style='color:#7a7a7a'>" + text + '</span>');
            } else if (type == 2) {
                // 结束时的总距离展示

                var u = this.unit;
                var unit = this.units[u].u1;
                var dis = this.convertUnit(this.getTotalDistance(), u);
                if (dis > this.units[u].incon) {
                    dis = dis / this.units[u].incon;
                    unit = this.units[u].u2;
                    dis = dis.toFixed(1);
                } else {
                    dis = dis.toFixed(1);
                }
                htmls.push("总长：<span style='" + this.styles.BMapLib_disBoxDis + "'>" + Number(dis) + '</span>' + unit);
            } else {
                title.setOffset(0, 25);
                htmls.push(t);
            }
            title.setContent(htmls.join(''));
        },

        /**
         * 处理最后一次操作，当用户双击或测距被强行退出时调用
         * @return 没有返回值
         */
        processLastOp() {
            // 删除上次移动临时数据
            delete this.mapBind.x;
            delete this.mapBind.y;
            delete this.mapBind.initX;
            delete this.mapBind.initY;
            // 验证路径
            if (this.paths.length > this.points.length - 1) {
                var l = this.paths.length - 1;
                this.paths[l].remove();
                this.paths[l] = null;
                this.paths.length = l;
            }
            // 保存本次测距对象
            var disObj = {};
            disObj.points = this.points.slice(0);
            disObj.paths = this.paths.slice(0);
            disObj.dots = this.dots.slice(0);
            disObj.segDis = this.segDistance.slice(0);
            // 判断总距离和按钮位置
            var lstPx = this.map.pointToPixel(disObj.points[disObj.points.length - 1]);
            var prePx = this.map.pointToPixel(disObj.points[disObj.points.length - 2]);
            var btnOffset = [0, 0];
            var disOffset = [0, 0];
            if (lstPx.y - prePx.y >= 0) {
                // 距离位于下端
                disOffset = [-5, 11];
            } else {
                // 距离位于上端
                disOffset = [-5, -35];
            }
            if (lstPx.x - prePx.x >= 0) {
                // 按钮位于右侧
                btnOffset = [14, 0];
            } else {
                // 按钮位于左侧
                btnOffset = [-14, 0];
            }
            // 显示总距离
            var pt = disObj.points[disObj.points.length - 1];
            pt.disLabel = new this.BMap.Label('', { offset: new this.BMap.Size(-15, -40), enableMassClear: this.enableMassClear });
            pt.disLabel.setStyles({ color: '#333', borderColor: '#ff0103' });
            this.map.addOverlay(pt.disLabel);
            pt.disLabel.setOffset(new this.BMap.Size(disOffset[0], disOffset[1]));
            pt.disLabel.setPosition(pt);
            this.formatLabel(2, '', '', pt.disLabel);
            // 添加关闭按钮
            var bico = this.options.closeIcon
                ? this.options.closeIcon
                : new this.BMap.Icon('./baidu-map/images/mapctrls.gif', new this.BMap.Size(12, 12), {
                      imageOffset: new this.BMap.Size(0, -14),
                  });
            disObj.closeBtn = new this.BMap.Marker(disObj.points[disObj.points.length - 1], {
                icon: bico,
                offset: new this.BMap.Size(btnOffset[0], btnOffset[1]),
                baseZIndex: 3600000,
                enableMassClear: this.enableMassClear,
            });
            disObj.closeBtn.setTop(true);
            this.map.addOverlay(disObj.closeBtn);
            disObj.closeBtn.setTitle('清除本次测距');
            // 点击关闭按钮，绑定关闭按钮事件
            disObj.closeBtn.addEventListener('click', (e) => {
                // 关闭本次测距，清除相关存储和变量
                for (var i = 0, l = disObj.points.length; i < l; i++) {
                    disObj.points[i].disLabel.remove();
                    disObj.points[i].disLabel = null;
                }
                for (var i = 0, l = disObj.paths.length; i < l; i++) {
                    disObj.paths[i].remove();
                    disObj.paths[i] = null;
                }
                for (var i = 0, l = disObj.dots.length; i < l; i++) {
                    disObj.dots[i].remove();
                    disObj.dots[i] = null;
                }
                disObj.closeBtn.remove();
                disObj.closeBtn = null;
                this.stopBubble(e);

                /**
                 * @ignore
                 * 测距结束后，点击线段上最后一个节点旁的关闭按钮时，派发事件的接口
                 * @name DistanceTool#onremovepolyline
                 * @event
                 * @param {Event Object} e 回调函数会返回event参数
                 *
                 * @example <b>参考示例：</b><br />
                 * myDistanceToolObject.addEventListener("removepolyline", function(e) {  alert(e.type);  });
                 */

                // 生成名为onremovepolyline的baidu.lang.Event对象
                // 然后在此刻，将绑定在onremovepolyline上事件，全部赋予event参数，然后派发出去
                //var event = new baidu.lang.Event('onremovepolyline');
                //me.dispatchEvent(event);
            });
            this.initData();
        },

        /**
         * 格式化距离字符串
         * @param {Number} 距离
         * @return {String} 格式化的字符串
         */
        formatDisStr(distance) {
            var u = this.unit;
            var unit = this.units[u].u1;
            var dis = this.convertUnit(distance, u);

            if (dis > this.units[u].incon) {
                dis = dis / this.units[u].incon;
                unit = this.units[u].u2;
                dis = dis.toFixed(1);
            } else {
                dis = dis.toFixed(1);
            }

            return Number(dis) + unit;
        },

        /**
         * 清除本次测距的暂存数据
         * @return 无返回值
         */
        clearCurData() {
            for (var i = 0, l = this.points.length; i < l; i++) {
                if (this.points[i].disLabel) {
                    this.points[i].disLabel.remove();
                }
            }
            for (var i = 0, l = this.paths.length; i < l; i++) {
                this.paths[i].remove();
            }
            for (var i = 0, l = this.dots.length; i < l; i++) {
                this.dots[i].remove();
            }
            this.initData();
        },

        close() {
            if (this.isOpen == false) {
                return;
            }
            this.isOpen = false;

            if (this.mapConfig.mapMoving) {
                delete this.mapConfig.mapMoving;
            }

            if (this.points.length < 2) {
                // 不是有效绘制，清除所有内容
                this.clearCurData();
            } else {
                this.paths[this.paths.length - 1].remove();
                this.paths[this.paths.length - 1] = null;
                this.paths.length = this.paths.length - 1;
                // 移除最近一次标记
                var pt = this.points[this.points.length - 1];
                if (pt.disLabel) {
                    pt.disLabel.remove();
                }
                this.processLastOp();
            }
            this.hideMask();

            // 删除绑定的事件
            this.unbindAllEvent();

            // 停止地图移动
            if (this.movingTimerId) {
                clearInterval(this.movingTimerId);
                this.movingTimerId = null;
            }

            if (this.followLabel) {
                this.followLabel.hide();
            }
        },

        /**
         * 初始化存储数组
         * @return 无返回值
         */
        initData() {
            // 初始化point数组
            this.points.length = 0;
            // 初始化path数组
            this.paths.length = 0;
            // 初始化分段距离数组
            this.segDistance.length = 0;
            // 初始化结点图像数组
            this.dots.length = 0;
        },

        /**
         * 计算两点之间距离并存放在分段距离数组中
         * @param {Point}
         * @param {Point}
         * @return {Number} 两个地理点之间的距离
         */
        setSegDistance(pt0, pt1) {
            if (!pt0 || !pt1) {
                return;
            }
            var dis = this.map.getDistance(pt0, pt1);
            this.segDistance.push(dis);
            return dis;
        },

        /**
         * 获得总距离
         * @return {Number} 总距离
         */
        getTotalDistance() {
            var totalDis = 0;
            for (var i = 0, l = this.segDistance.length; i < l; i++) {
                totalDis += this.segDistance[i];
            }
            return totalDis;
        },

        /**
         * 将米制单位的数值换算成为目标单位下的数值
         * @type {Number} 需要转换的数值
         * @type {String} 字符串描述的目标单位，
         * "metric" 表示米制单位，
         * "us" 表示美国传统单位制
         * @return {Number} 转换后的数值
         */
        convertUnit(num, unit) {
            unit = unit || 'metric';
            if (this.units[unit]) {
                return num * this.units[unit].conv;
            }
            return num;
        },

        addSecPoint(pt) {
            let ico = new this.BMap.Icon('./baidu-map/images/mapctrls.png', new this.BMap.Size(11, 11), {
                imageOffset: new this.BMap.Size(-26, -313),
            });
            let secPt = new this.BMap.Marker(pt, {
                icon: ico,
                clickable: false,
                baseZIndex: 3500000,
                zIndexFixed: true,
                enableMassClear: this.enableMassClear,
            });
            secPt.setTop(true);
            this.map.addOverlay(secPt);
            this.dots.push(secPt);
        },
        getDrawPoint(e, n) {
            e = window.event || e;
            let x = e.layerX || e.offsetX || 0;
            let y = e.layerY || e.offsetY || 0;
            let t = e.target || e.srcElement;
            if (t != this.operationMask.dom && n) {
                while (t && t != this.mapConfig.mapContainer) {
                    if (!(t.clientWidth == 0 && t.clientHeight == 0 && t.offsetParent && t.offsetParent.nodeName.toLowerCase() == 'td')) {
                        x += t.offsetLeft;
                        y += t.offsetTop;
                    }
                    t = t.offsetParent;
                }
            }

            if (t != this.operationMask.dom && t != this.mapConfig.mapContainer) {
                return;
            }
            if (typeof x === 'undefined' || typeof y === 'undefined') {
                return;
            }
            if (isNaN(x) || isNaN(y)) {
                return;
            }
            return this.map.pixelToPoint(new this.BMap.Pixel(x, y));
        },

        /**
         * 验证传入点的位置合理性
         * @param {BMap.Point} pt 需要被验证的point点
         * @return 无返回值
         */
        isPointValid(pt) {
            if (!pt) {
                return false;
            }
            let mapBounds = this.map.getBounds();
            let sw = mapBounds.getSouthWest(),
                ne = mapBounds.getNorthEast();
            if (pt.lng < sw.lng || pt.lng > ne.lng || pt.lat < sw.lat || pt.lat > ne.lat) {
                return false;
            }
            return true;
        },
        /**
         * 停止事件冒泡传播，
         * 闭包，对外不暴露
         *
         * @type {Event} e e对象
         */
        stopBubble(e) {
            var e = window.event || e;
            e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        },
    },
};
</script>

<style lang="scss" scoped>
.tool {
    display: inline-block;
    font-size: 14px;
    background: #fff;
    border: none;
    color: #606266;
    cursor: pointer;

    &.active {
        color: #409eff;
    }
}
</style>
