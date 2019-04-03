<template>
  <transition name="van-slide-up">
    <div
      v-if="shouldRender"
      v-show="value"
      :class="b({ 'withtitle': title,'border-radius':borderRadius})"
    >
      <div
        v-if="title"
        :class="b('header')"
        class="van-hairline--top-bottom"
      >
        <div v-text="title" />
          <van-icon name="arrow-left" class="closed"  @click="onCancel" />
        <icon v-if='closed'
          name="close"
          @click="onCancel"
        />
        <span v-if="rightTitleText" class="right-title-text" @click="onCancel">{{rightTitleText}}
          
        </span>
      </div>
      <ul
        v-else
        class="van-hairline--bottom"
      >
        <li
          v-for="item in actions"
          :class="[
            b('item', { disabled: item.disabled || item.loading }),
            item.className,
            'van-hairline--top'
          ]"
          @click.stop="onSelect(item)"
        >
          <template v-if="!item.loading">
            <span :class="b('name')">{{ item.name }}</span>
            <span
              v-if="item.subname"
              :class="b('subname')"
            >
              {{ item.subname }}
            </span>
          </template>
          <loading
            v-else
            :class="b('loading')"
            size="20px"
          />
        </li>
      </ul>
      <div
        v-if="cancelText"
        v-text="cancelText"
        :class="[b('cancel'), 'van-hairline--top']"
        @click="onCancel"
      />
      <div
        v-else
        :class="b('content')"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import create from '../utils/create';
import Popup from '../mixins/popup';

export default create({
  name: 'actionsheet',

  mixins: [Popup],

  props: {
    title: String,
    value: Boolean,
    rightTitleText:String,
    actions: Array,
    cancelText: String,
    closed:{
      type:Boolean,
      default:false,
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    borderRadius:{
      type:Boolean,
      default:false
    },
  },

  methods: {
    onSelect(item) {
      if (!item.disabled && !item.loading) {
        if (item.callback) {
          item.callback(item);
        }

        this.$emit('select', item);
      }
    },

    onCancel() {
      this.$emit('input', false);
      this.$emit('cancel');
    }
  }
});
</script>
