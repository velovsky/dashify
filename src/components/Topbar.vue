<template>
  <div class="dashify-topbar">
    <div class="logo">
      <!-- <i class="fas fa-barcode fa-4x"></i> -->
      <img src="../assets/logo.png">
      <span>DASHIFY</span>
    </div>
    <div class="link-container">
      <router-link tag="div" v-for="(link,index) in linkContainer"
           :to = "link.path"
           class = "link"
           :key = "index">
        <a>
          <i class="material-icons">{{ link.mdlIcon }}</i>
          <span>{{ link.title }}</span>
        </a>
      </router-link>
    </div>
    <div class="search"
         @click="stopPropragation()">
      <i class="material-icons"
         @click="searchFunction()">search</i>
      <input 
        v-model="search.input"
        :class="{ closed: this.isSearchClosed }" 
        type="text">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
  name: 'topbar',
  data()
  {
    return {
      title: "Topbar",
      search: {input: ""},
      linkContainer: 
      [ 
        {path: "/", mdlIcon: "dashboard", title: "Dashboard"},
        {path: "/Users/10", mdlIcon: "map", title: "Map"}
      ]      
    }
  },
  computed: {
    ...mapGetters(['users','isSearchClosed'])
  },
  methods:
  {
    stopPropragation: function(e)
    {
      if (!e)
       e = window.event;

      //IE9 & Other Browsers
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    },
    searchFunction: function()
    {
      //toggle search
      if(this.isSearchClosed || (!this.isSearchClosed && this.search.input.length === 0))
      {
        this.$store.commit('updateSearchState',!this.isSearchClosed); //update state
      }
      else
        console.log("searching for " + this.search.input);
    }
  }
}

</script>

<style lang="scss">

.dashify-topbar
{
  @extend %box-sizing-border;
  @extend %noselect;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  height: $topbar-height;
  width: 100%;
  background-color: $main-color-1;
  color: $main-text-color;
}

.dashify-topbar .logo
{
  display: flex;
  align-items: center;
  height: 80%;
  width: 100px;
}

@media only screen and (max-width: 600px)
{
  .dashify-topbar .logo img
  {
    @include fade-in-animation($topbar-link-transition-time);
    display: inherit !important;
  }

  .dashify-topbar .logo span
  {
    display: none;
  }
}

.dashify-topbar .logo img
{
  display: none;
  max-width: 100%;
  max-height: 100%;
}

@import url('https://fonts.googleapis.com/css?family=Faster+One');

.dashify-topbar .logo span
{
  @include fade-in-animation($topbar-link-transition-time);
  margin-left: 10px;
  font-family: 'Faster One';
  font-size: 34px;
  color: $secondary-color;
}

.dashify-topbar .link-container
{
  display: flex;
  margin-left: auto;
  align-items: center;
}

.dashify-topbar .search
{
  display: inherit;
  cursor: pointer;
}

.dashify-topbar .search i
{
  font-size: $topbar-mdl-size;
  padding: 2px;
  border-radius: 20px;
  transition: background-color $topbar-link-transition-time;
}

.dashify-topbar .search i:hover
{
  background-color: rgba(118, 118, 118, 0.26);
}

.dashify-topbar .search input
{
  width: 100px;
  background-color: transparent;
  border-color: transparent;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  width: 200px;
  transition: all $topbar-link-transition-time;
}

.dashify-topbar .search input.closed
{
  visibility: hidden;
  width: 0px;
}

.dashify-topbar .link-container .link
{
  margin-top: 12px;
  margin-right: 40px;
  cursor: pointer;
  transition: all $topbar-link-transition-time;
}

.dashify-topbar .link-container .link:hover
{
  color: $thirdary-color;
  box-shadow: 0px -8px 0px 0px $thirdary-color;  
}

.dashify-topbar .link-container .link.router-link-exact-active
{
  color: $secondary-color;
  box-shadow: 0px -8px 0px 0px $secondary-color;
}

.dashify-topbar .link-container .link a
{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashify-topbar .link-container .link i
{
  font-size: $topbar-mdl-size;
}

.dashify-topbar .link-container .link span
{
  font-size: 12px;
}

@media only screen and (max-width: 600px)
{
  .dashify-topbar .link-container .link span
  {
    display: none;
  }

  .dashify-topbar .link-container .link
  {
    margin-right: 20px;
  }
}

.dashify-topbar .link-container > a
{ 
  padding-left: 10px;
  text-decoration: none;
}

</style>