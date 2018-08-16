import Vue from "vue";
import router from "./router.js";
import store from "./store.js";

import app from "./app.vue";

new Vue({
	el:"#main",
	data:{},
	router,
	store,
	render:h=>h(app)
});