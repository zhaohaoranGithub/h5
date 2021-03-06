# Icon 图标

<script>
</script>

<ClientOnly>

<script>
  var iconList = require('./icon.json');

  export default {
    data() {
      return {
        icons: iconList
      };
    }
  }
</script>

整合全站所有图标。包含fonticon、svg icon和图片icon。

### 使用方法示例

:::demo
```html
<i class="el-icon-edit"></i>
<svg class="svg-icon" aria-hidden="true">
    <use xlink:href="#icon-history"></use>
</svg>
<svg class="svg-icon" aria-hidden="true">
    <use xlink:href="#icon-Hdonghua-xiangshangzhankai"></use>
</svg>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="primary" icon="el-icon-search">搜索</el-button>
```
:::

### svg 无色图标集合

:::demo
```html
<color-container>
<ul class="icon-list">
<li>
<svg class="svg-icon" aria-hidden="true">
    <use xlink:href="#icon-history"></use>
</svg>
</li>
</ul>
```
:::


### svg 彩色图标集合

<ul class="icon-list">
<li>
<svg class="svg-icon" aria-hidden="true">
    <use xlink:href="#icon-Hdonghua-xiangshangfeiru"></use>
</svg>
</li>
<li>
<svg class="svg-icon" aria-hidden="true">
    <use xlink:href="#icon-Hdonghua-chache"></use>
</svg>
</li>
</ul>

### 字体图标集合

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span>
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'el-icon-' + name}}</span>
    </span>
  </li>
</ul>

</ClientOnly>

<style lang="scss">
  .demo-icon .source i {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }

  .demo-icon .source  button {
    margin: 0 20px;
  }

  .content  ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: solid 1px #eaeefb;
    border-radius: 4px;
  }
  .icon-list li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;

    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;

    @utils-vertical-center;

    span {
      display: inline-block;
      line-height: normal;
      vertical-align: middle;
      font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
      color: #99a9bf;
    }

    i {
      display: block;
      font-size: 32px;
      margin-bottom: 15px;
      color: #606266;
    }

    .icon-name {
      display: inline-block;
      padding: 0 3px;
      height: 1em;
      color: #606266;
    }

    &:hover {
      color: rgb(92, 182, 255);
    }
  }

  .svg-icon {
    margin: 0 20px;
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }
</style>
