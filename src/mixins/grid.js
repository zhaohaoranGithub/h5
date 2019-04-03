import getCommand from './get-command';
import form from './form';
import Sortable from 'sortablejs';

/**
 * 表单加载数据和保存数据通用流程
 */
export default {
  mixins: [
    getCommand,
    form
  ],

  data() {
    return {
      gridPageSize: [10, 20, 30, 50],
      gridLayout: 'total, sizes, prev, pager, next, jumper',
      tableSortAble: false,
      sortable:null,
      sendingData: undefined,
      option: undefined,
    };
  },

  computed:{
    cTableData() {
      return {
        ...this.tableData,
        list: _.slice(this.tableData.list, (this.filters.page - 1) * this.filters.size, this.filters.page * this.filters.size),
      };
    },
  },

  methods: {
    sortChange(data) {
      const { order, column } = data;

      if (order) {
        if (column.property) {
          this.filters.order = column.property;
          if (order === 'ascending') {
            this.filters.sort = 'asc';
          } else {
            this.filters.sort = 'desc';
          }
          this.gridSearch();
        } else {
          throw new Error('没有找到排序用property');
        }
      } else {
        this.filters.sort = undefined;
        this.filters.order = undefined;
        this.gridSearch();
      }
    },

    gridSearch() {
      this.filters.page = 1;
      this.prevCursorList = [];
      if (this.filters.cursor) {
        this.filters.cursor = undefined;
      }
      this.doGet({action: 'getGrid'});
    },

    gridSizeChange(val) {
      this.filters.limit = val;
      this.doGet({action: 'getGrid'});
    },

    gridCurrentChange(val) {
      this.filters.page = val;
      this.doGet({action: 'getGrid'});
    },

    localGridSizeChange(val) {
      this.filters.limit = val;
    },

    localGridCurrentChange(val) {
      this.filters.page = val;
    },

    cursorGridSizeChange(val) {
      this.filters.size = val;

      this.gridSearch();
    },

    cursorPrevClickChange(val) {
      this.filters.page = val;
      this.filters.cursor = this.prevCursorList.pop();
      this.doGet({action: 'getGrid'});
    },

    cursorNextClickChange(val) {
      if (this.filters.page > 1) {
        this.prevCursorList.push(this.filters.cursor);
      }

      this.filters.page = val;

      this.filters.cursor = this[this.sendingData || 'tableData'].cursor;
      this.doGet({action: 'getGrid'});
    },

    getLocalSummaries({columns, data}) {
      const fStatistic = [];
      _.each(columns, (column, index) => {
        if (column.property) {
          fStatistic[index] = _.sumBy(data, o => {
            return Number(o[column.property]);
          });

          if (_.isNumber(fStatistic[index]) && !_.isNaN(fStatistic[index])) {

            const columnStatistic = _.find(this.statistic, {index: index});

            if (columnStatistic) {
              if (columnStatistic.localFormat) {
                fStatistic[index] = columnStatistic.localFormat(fStatistic[index]);
              } else if (columnStatistic.format) {
                fStatistic[index] = columnStatistic.format(fStatistic[index]);
              }
            } else {
              fStatistic[index] = fStatistic[index];
            }
          } else {
            fStatistic[index] = undefined;
          }
        }
      });

      fStatistic[0] = '汇总';

      return fStatistic;
    },

    getSummaries() {
      const fStatistic = [];
      _.each(this.statistic, (statisticInfo) => {
        fStatistic[statisticInfo.index] = statisticInfo.format ?
          statisticInfo.format(_.result(this, statisticInfo.prop)) : _.result(this, statisticInfo.prop);
      });
      if (!fStatistic[0]) {
        fStatistic[0] = this.summariesText;
      }

      return fStatistic;
    },
  },
};
