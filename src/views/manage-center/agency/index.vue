<template>
  <div class="agency-main">
    <div class="agency-main__input">
      <van-field v-model="form.domain" clearable placeholder="请输入代理提供的域名">
      </van-field>
    </div>
    <van-row type="flex" justify="center" class="account-button">
      <van-button type="primary" block shadow  native-type="submit" @click="submit">保存</van-button>
    </van-row>
  </div>
</template>

<script>
  import {factory, form} from '@/build';
  import {saveAgencyUrl} from '@/services/api/user';
  export default {
    name: "agency-index",
    mixins: [form, factory],
    data() {
      return {
        form: {
          domain: undefined
        }
      };
    },
    computed: {

    },
    methods: {
      submit(){
        if(this.form.domain){
          this.doSave({action: 'saveForm'});
        } else {
          this.$toast('不能为空');
        }
      }
    },
    mounted() {
      this.bindSave(saveAgencyUrl, 'saveForm', 'form',
        {
          beforeSend: (data) => {
            // debugger;
            return data;
          },
          callback: ([result, data]) => {
            if (!result) {
              this.$toast('域名错误');
            } else {
              this.$toast('添加成功');
              this.$store.dispatch(types.CHECK_IS_SIGNIN);
              this.$router.push({path: '/mc'});
            }
          }
        }
      );
    }
  };
</script>

<style lang="scss" scoped>
  @include b(agency-main) {
    min-height: calc(100vh - 75px);
    padding: 15px 0;
    background-color: #eff0f1;
    .van-cell {
      padding-right: 15px;
    }
    .van-row {
      margin: 30px 15px 0 15px;
    }
  }
</style>
