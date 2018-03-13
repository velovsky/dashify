import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store(
{
  state:
  {
    searchClosed: undefined,
    currentPage: { name: undefined, navId: undefined, oldId: undefined },
    registrations:[],
    users: [
        {id: 1, name:"Mother"},
        {id: 2, name:"Father"},
        {id: 3, name:"John"},
        {id: 4, name:"Francis"}
    ]
  },
  getters:
  {
    users: function(state)
    {
      return state.users;
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
    }
  }
})