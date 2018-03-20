<template>
  <div class="dashify-sidebar">
    <div class="dashify-side-nav">
      <div v-for="(icon,index) in sideIcons"
           @click="toggleSidebar(icon)"
           class="dashify-side-icon"
           :class="{ selected: icon.isSelected }"
           :key="index">
        <i class="material-icons">{{ icon.mdlIcon }}</i>
      </div>
    </div>
    <transition name="teste">
    <div class="dashify-side-menu"
        ref="sideMenu"
        :class="{ close: isClosed }"
        :id="sideMenu.id">
      <test v-if="componentSelected === 'teste'" style="display:none;"></test>
      <config-dashboard v-else-if="componentSelected === 'ConfigDashboard'" style="display:none;"></config-dashboard>
      <div v-else style="display:none;">TESTING!</div>
    </div>
    </transition>
  </div>
</template>

<script>
//Sidebar Components
import test from './tabs/test'
import ConfigDashboard from './tabs/ConfigDashboard'

export default
{
  name: 'sidebar',
  components: { test, ConfigDashboard },
  data()
  {
    return{
      isClosed: true,
      iconSelected: undefined,
      componentSelected: undefined,
      sideIcons:
      [
        {id: 1, mdlIcon: "accessibility", isSelected: false, componentSelected: 'teste'},
        {id: 2, mdlIcon: "3d_rotation", isSelected: false, componentSelected: ''},
        {id: 3, mdlIcon: "view_quilt", isSelected: false, componentSelected: 'ConfigDashboard'}
      ],
      sideMenu:
      {
        id: "sideMenu"
      }
    }
  },
  methods:
  {
    toggleSidebar: function(icon)
    {
      var oldStatus = this.isClosed; //FX solution TODO: study vue transitions and implement
      this.$refs.sideMenu.classList.remove("xpto");

      //toggle side menu
      if(this.iconSelected === icon || this.isClosed)
        this.isClosed = !this.isClosed;

      icon.isSelected = !icon.isSelected;

      //remove old selected icon
      if(this.iconSelected && this.iconSelected != icon)
        this.iconSelected.isSelected = false;

      //reference new selected icon
      this.iconSelected = icon;
      if(oldStatus && !this.isClosed) //quick workaround for the display FX. Had trouble with transition & display
      {
        setTimeout(function() 
        { 
          this.componentSelected = icon.componentSelected;
          this.$refs.sideMenu.classList.add("xpto");
        }.bind(this), 300); //has to match the FX timer
      }
      else
      {
        this.componentSelected = icon.componentSelected;
        this.$refs.sideMenu.classList.add("xpto");
      }
    }
  }
}
</script>

<style lang="scss">

.dashify-sidebar
{
  position: absolute;
  width: calc(#{$sidebar-menu-width} + #{$sidebar-nav-width});
  height: calc(100% - #{$topbar-height});
}

//side-menu
.dashify-side-menu
{
  @extend %box-sizing-border;
  padding: 20px 10px 0px 10px;
  position: absolute;
  width: $sidebar-menu-width;
  height: 100%;
  margin-left: $sidebar-nav-width;
  background: linear-gradient(to right, #{$main-color-2}, #{$main-color-3});
  border-top: 1px solid $sidebar-nav-border-color;
  box-shadow: 5px 1px 4px 0px rgba(82, 82, 82, 0.3);
  color: $main-text-color;
  z-index: 1;
  transition: width $sidebar-nav-transition-time;
}

.dashify-side-menu.xpto > div
{
  display: inherit !important;
}

.dashify-side-menu > div
{
  display: none;
  @include fade-in-animation($sidebar-nav-transition-time);
}

.dashify-side-menu.close
{
  padding: 0px;
  width: 0px;
}

.dashify-side-menu.close > div, //.forceClose
{
  display: none;
}

//side-nav
.dashify-side-nav
{
  display: flex;
  flex-direction: column;
  width: $sidebar-nav-width;
  height: 100%;
  position: absolute;
  background-color: $main-color-1;
  box-shadow: 5px 1px 4px 0px $box-shadow-color;
  z-index: 1;
}

.dashify-side-nav .dashify-side-icon:nth-child(1)
{
  border-bottom: none;
}

.dashify-side-nav .dashify-side-icon:last-child
{
  border-top: none;
}

.dashify-side-nav .dashify-side-icon
{
  @extend %noselect;
  cursor: pointer;
  text-align: center;
  border-top: 1px solid $sidebar-nav-border-color;
  border-bottom: 1px solid $sidebar-nav-border-color;
  color: $main-text-color;
  transition: all $sidebar-nav-transition-time;
}

.dashify-side-nav .dashify-side-icon:hover
{
  color: $thirdary-color;
  box-shadow: inset 5px 0px $thirdary-color;
}

.dashify-side-nav .dashify-side-icon.selected
{
  color: $thirdary-color;
  background-color: $main-color-2;
  box-shadow: inset 5px 0px $thirdary-color;
}

.dashify-side-nav .dashify-side-icon i
{
  padding: 15px 10px;
  font-size: 32px;
}

</style>
