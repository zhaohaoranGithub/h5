import getCommand from '@/mixins/get-command';

import {
  addressProvinceApi,
  addressCityListApi,
  addressAreaListApi,
} from '@/services/api/address';

export default {

  mixins: [getCommand],

  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      rules: {
        provinceId: [
          {required: true, message: '请选择省份'}
        ],
        cityId: [
          {required: true, message: '请选择城市'}
        ],
        areaId: [
          {required: true, message: '请选择地区'}
        ],
      }
    };
  },

  watch: {
    'form.provinceId': {
      handler(id) {
        if (id) {
          this.doGet({
            action: 'getCityByProvince'
          });
        }
        this.cityList = [];
        this.form.cityId = undefined;
      }
    },

    'form.cityId': {
      handler(id) {
        if (id) {
          this.doGet({
            action: 'getAreaByCity'
          });
        }
        this.areaList = [];
        this.form.areaId = undefined;
      }
    },
  },

  mounted() {
    this.bindGet(addressProvinceApi, 'provinceList', {
      afterSuccess: () => {
      }
    });
    this.getAll();

    this.bindGet(addressCityListApi, 'cityList', {
      sendingData: 'form.provinceId',
      action: 'getCityByProvince'
    });
    this.bindGet(addressAreaListApi, 'areaList', {
      sendingData: 'form.cityId',
      action: 'getAreaByCity',
      format: (data) => {
        return [...data, {
          id: -1,
          name: '其他'
        }];
      }
    });
  }
};
