import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes=[];

const router=new Router({
	mode:"hash",
	routes
});

router.beforeEach((to,from,next)=>{
	next();
});

export default router;