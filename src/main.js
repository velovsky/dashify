import 'es6-promise/auto' //required in IE
//Vue
import Vue from 'vue'
import VueRouter from 'vue-router'
//Components
import App from './App.vue'
//Routing
import Home from './views/Home'
import Users from './views/Users'
//Store
import { store } from './store';

Vue.use(VueRouter);

const routes = [
	{name: 'Dashboard', path: '/', component: Home},
	{name: 'Map', path: '/Users/:teamId', component: Users}
]

const router = new VueRouter(
{
	routes,
	mode: 'history'
});

var vm = new Vue(
{
	el:"#app",
	router,
	store,
	render: h => h(App)
	// ,
	// created: function()
	// {
	// 	var page = this.$routes.name;
	// 	if(page === 'Dashboard')

	// }
	// template: '<App/>',
	// components: { App }	
});

console.log(vm);