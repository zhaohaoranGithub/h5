export default {
  data() {
    return {
      beforeToday: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      beforeAdult: {
        disabledDate(time) {
          return moment(time).isAfter(moment().add(-18, 'year')) || time.getTime() > Date.now();
        }
      },
      beforeAdultTimestamp() {
        return moment().add(-18, 'year').valueOf();
      },
      pickerWeekStep: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      pickerDayStep: {
        shortcuts: [{
          text: '昨天',
          onClick(picker) {
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, start]);
          }
        }, {
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * (start.getDate()-1));
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上月',
          onClick(picker) {
            const current = new Date();
            const _date = current.getDate();
            const _month= current.getMonth()+1;
            const _year= current.getFullYear();
            const monthDays = new Date(_year, _month, 0).getDate();
            const end = current.setTime(current.getTime() - 3600 * 1000 * 24 * _date);
            const start =  current.setTime(current.getTime() - 3600 * 1000 * 24 * monthDays);
            picker.$emit('pick', [start, end]);
          }
        }]
      },

    };
  }
};
