<script>
import commonMixin from '../base/mixins/common';
import { createSize, createIcon } from '../base/factory';
export default {
    name: 'bm-panorama',
    mixins: [commonMixin('control')],
    props: {
        anchor: String,
        offset: Object
    },
    watch: {
        anchor() {
            this.reload();
        },
        offset() {
            this.reload();
        }
    },
    methods: {
        load() {
            const { BMap, map, anchor, offset } = this;

            this.originInstance = new BMap.CityListControl({
                anchor: global[anchor],
                offset: offset && createSize(BMap, offset)
            });
            map.addControl(this.originInstance);
        }
    },
    render() {}
};
</script>
<style lang="scss">
.map {
    .BMap_CityListCtrl {
        .ui_city_change {
            height: 32px !important;
            margin-bottom: 5px;
            .ui_city_change_inner {
                height: 32px;
                padding: 0 18px 0 15px;
                border: 0;
                border-radius: 2px;
                line-height: 32px;
                background: #fff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            }
        }
        
        .ui_city_change_click {
            .ui_city_change_inner {
                i {
                    top: 16px;
                }
            }
            
        }

        .citylist_popup_main {
            border: 0;
            border-radius: 2px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

            .citylist_ctr_title {
                padding: 4px 0 4px 8px;
            }

            #popup_close {
                top: 11px;
            }
        }
    }
}
</style>
