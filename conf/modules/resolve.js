module.exports=function(enable){
	if(!enable){
		return {
			alias:{},
			modules:["node_modules"]
		}
	} 

	return {
		alias:{
			"vue":"vue/dist/vue.runtime.esm.js",
			"vue-router":"vue-router/dist/vue-router.esm.js",
			"vuex":"vuex/dist/vuex.esm.js"
		},
		modules:["node_modules"]
	}
};