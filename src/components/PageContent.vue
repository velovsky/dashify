<template>
  <div class="dashify-page-content">
    <router-view></router-view>
  </div>
</template>

<script>
export default 
{
  name: 'pageContent',
  data()
  {
    return{
      title:"content"
    }
  }
}
</script>

<style lang="scss">

.dashify-page-content
{
  height: calc(100% - #{$topbar-height} - #{$page-content-padding}*2);
  position: absolute;
  width: calc(100% - #{$sidebar-nav-width} - #{$page-content-padding}*2);
  margin-left: $sidebar-nav-width;
  padding: 10px;
  background-color: $page-content-bg-color;
  box-shadow: inset 1px 5px 4px 0px $box-shadow-color;
}

</style>
