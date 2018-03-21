import 'es6-promise/auto' //required in IE
//Vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMdc from 'vue-mdc'
import 'vue-mdc/dist/vue-mdc.css'
//Components
import App from './App.vue'
//Routing
import Dashboard from './views/Dashboard'
import Users from './views/Users'
//Store
import { store } from './store';

Vue.use(VueMdc);
Vue.use(VueRouter);

const routes = [
	{name: 'Dashboard', path: '/', component: Dashboard},
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
});