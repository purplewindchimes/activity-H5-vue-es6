var path=require("path");
var glob=require("glob");

module.exports=function(dir){
	return glob.sync(path.resolve(process.cwd(),dir),{
		nomount:true,
		nosort:true,
		strict:true
	});
}