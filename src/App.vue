<template>
  <div id="app"
       @click="closeSearch()">
    <topbar></topbar>
    <sidebar></sidebar>
    <page-content></page-content>
  </div>
</template>

<script>
//Vue Components
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar/Sidebar'
import PageContent from './components/PageContent'

//Getters
import { mapGetters } from 'vuex';

export default 
{
  name: 'app',
  components: { Topbar, Sidebar, PageContent },
  created: function()
  {
    this.closeSearch();
  },
  computed:
  {
    ...mapGetters(['isSearchClosed'])
  },
  methods:
  {
    closeSearch: function()
    {
      if(!this.isSearchClosed)
        this.$store.commit('updateSearchState',true);
    }
  }
}
</script>

<style lang="scss">
$mdc-theme-accent: #41B883;
$mdc-theme-background: #fff;
$mdc-theme-primary: $secondary-color;
@import 'vue-mdc-adapter/dist/styles';

html, body
{
  height: 100%;
  margin: auto;
  overflow-y: hidden;
}

#app {
  height: 100%;
  position: relative;
  font-family: 'Montserrat','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
