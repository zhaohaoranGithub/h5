<template>
  <svg :class="[
    svgClass,
    inputSize ? 'svg-icon--' + inputSize : '',
    type ? 'svg-icon--' + type : '',
    {
      'is-pointer': pointer,
      'is-reverse': reverse,
      'is-stroke': stroke,
      'svg-icon--icon': isIcon,
    }
  ]" aria-hidden="true">
    <use :xlink:href="iconName"></use>
    <slot></slot>
  </svg>
</template>

<script>

  const requireAll = requireContext => requireContext.keys().map(requireContext);
  const req = require.context('@/svg', true, /\.svg$/);
  requireAll(req);

  export default {
    name: 'svg-icon',
    props: {
      iconClass: {
        type: String,
        required: true,
      },
      pointer: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'default'
      },
      isIcon: {
        type: Boolean,
        default: true,
      },
      stroke: false,
      reverse: {
        type: Boolean,
        default: false,
      } ,
      className: {
        type: String,
      },
      size: {
        type: String,
        default: 'small'
      },
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        if (this.className) {
          return `svg-icon ${this.className}`;
        }
        return 'svg-icon';
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },
  };
</script>

<style lang="scss">
  $--svg-color-default: $--color-white !default;

  $--svg-color: (
    'primary' : $--color-primary,
    'info' : #B4BDCA,
    'black-light': #cbcbcb,
    'warning' : $--color-warning,
    'danger' : $--color-danger,
    'success' : $--color-success,
    'black' : $--color-black,
    'white' : $--color-white,
  );

  $--svg-size: (
    'minimum' : (
      width: 10px,
      height: 10px,
    ),
    'mini' : (
      width: 12px,
      height: 12px,
    ),
    'small' : (
      width: 15px,
      height: 20px,
    ),
    'partial' : (
        width: 23px,
        height: 26px,
    ),
    'medium' : (
      width: 30px,
      height: 30px,
    ),
    'large' : (
      width: 60px,
      height: 60px,
    ),
  );

  @include b(svg-icon) {
    overflow: hidden;
    position: relative;
    fill: $--svg-color-default;

    @include when(pointer) {
      cursor: pointer;
    }
    @include when(reverse) {
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
    @include when(stroke) {
      fill: none;
      stroke: $--svg-color-default;
    }

    @each $svg-color-name, $value in $--svg-color {
      @include m($svg-color-name) {
        fill: $value;
        @include when(stroke) {
          fill: none;
          stroke: $value;
        }
      }
    }

    @each $svg-size-name, $value in $--svg-size {
      @include m($svg-size-name) {
        width: map-get($value, 'width');
        height: map-get($value, 'height');
      }
    }
  }
</style>
