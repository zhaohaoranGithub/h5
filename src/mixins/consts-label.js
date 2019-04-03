export default {
  methods: {
    getLabel(value, consts) {
      return _.result(_.find(consts,
        function (o) {
          return value === o.value;
        }), 'title');
    }
  }
};
