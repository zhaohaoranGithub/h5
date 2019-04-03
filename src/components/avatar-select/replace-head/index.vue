<template>
  <div class="replace-head-image">
    <div class="replace-head-image__list">
      <div
        @click="selectImg(i)"
        class="replace-head-image__item"
        :class="{'is-active': form.avatar == i}"
        v-for="(item, i) in avatarList"
      >
        <img class="replace-head-image__item-head" :src="item.pic" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  import avatarList from '../avatar-list';

  import {
    avatarSaveApi as saveApi
  } from '@/services/api/user';

  import form from '@/mixins/form';

  export default {
    name: 'replace-head',

    mixins: [form],

    props: ['avatar'],

    data() {
      return {
        form: {
          avatar: Number(this.avatar),
        },
        avatarList
      };
    },
    methods: {
      selectImg(n) {
        this.form.avatar = n;
          this.doSave({action: 'save'});
      },
      // conform() {
      //   this.doSave({action: 'save'});
      // }
    },

    mounted() {
      this.bindSave(saveApi, 'save', 'form', {
        successMessage: '设置头像成功',
        afterSuccess: () => {
          this.$store.dispatch(types.OAUTH);
          this.$emit('on-success');
        }
      });
    }
  };
</script>

<style lang="scss" scoped>
  @include b(replace-head-image) {
    @include e(list) {
      padding: 0 30px;
      height: 282px;
      margin-top: 25px;
      overflow: auto;
    }
    @include e(item) {
      float: left;
      width: 60px;
      height: 60px;
      margin: 0 16px 20px 0;
      border: 3px solid #ffffff;
      border-radius: 100%;
      overflow: hidden;
      cursor: pointer;
      @include utils-transition-normal();

      &:nth-child(4n) {
        margin-right: 0;
      }
      @include when(active) {
        border: 3px solid #1E5ADC;
      }
    }
    @include e(item-head) {
      width: 100%;
      height: 100%;
    }
  }
</style>
