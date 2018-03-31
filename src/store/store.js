import Vue from 'vue';
import Vuex from 'vuex';

import panels from './panels';

Vue.use(Vuex);

export const store = new Vuex.Store(
{
  state:
  {
    searchClosed: undefined,
    currentPage: { name: undefined, navId: undefined, oldId: undefined },
    gridLayoutConfig: [],
    users: [
        {id: 1, name:"Mother"},
        {id: 2, name:"Father"},
        {id: 3, name:"John"},
        {id: 4, name:"Francis"}
    ],
    panels
  },
  getters:
  {
    users: function(state)
    {
      return state.users;
    },
    getPanelsList: function(state)
    {
      return state.panels.list;
    },
    getPanelsConfig: function(state)
    {
      // return panelId => state.panels.config[panelId];
      return state.panels.config;
    },
    getGridLayout: function(state)
    {
      return state.gridLayoutConfig;
    },
    getPage: function(state)
    {
      return state.currentPage;
    },
    isSearchClosed: function(state)
    {
      return state.searchClosed;
    }
  },
  mutations:
  {
    updateSearchState: function(state,isClosed)
    {
      state.searchClosed = isClosed;
    },
    updateGridLayoutConfig: function(state,currentGrid)
    {
      state.gridLayoutConfig = currentGrid;
    }
  }
})