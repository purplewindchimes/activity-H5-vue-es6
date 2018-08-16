var path=require("path");
var _entries=require("./entries.js");

module.exports=function(project){
	var entry={},dir=[];

	var pdir=project||"*";

	_entries("./projects/"+pdir+"/entries/*/{app,index,main}.js").forEach((file)=>{
		dir=file.split("/");
		entry[dir[dir.length-2]]=file
	});

	return entry;
};