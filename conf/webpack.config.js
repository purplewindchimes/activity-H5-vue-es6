var path=require("path");
var merge=require("webpack-merge");

var entry=require("./modules/entry");
var loaders=require("./modules/loaders");
var mode=require("./modules/mode");
var resolve=require("./modules/resolve");
var plugins=require("./modules/plugins");

var env=JSON.parse(process.env.env);
var entries=entry(env.project);

var baseConfig={
	entry:entries,
	output:{
		path:path.resolve(__dirname,"../dist"),
		publicPath:"/dist/",
		filename:"js/[name].bundle.js"
	},
	module:loaders(env.features.vue),
	resolve:resolve(env.features.vue)
};

var extendConfig=mode(env.mode);

extendConfig.plugins=plugins(env.mode,entries,Object.keys(env.features),env.project);

module.exports=merge(baseConfig,extendConfig);