var path=require("path");

module.exports=function(mode){

	if(mode==="production") return {mode:mode};
	
	return {
		mode:"development",
		devtool:"cheep-module-eval-source-map",
		devServer:{
			contentBase:path.resolve(process.cwd(),"./dist/"),
			port:80,
			compress:true,
			inline:true,
			proxy:{}
		}
	};
};