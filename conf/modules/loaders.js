module.exports=function(enable){
	var loaders=[
		{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:/node_modules/
		}
	];

	if(enable){
		loaders.push({
			test:/\.vue$/,
			loader:'vue-loader',
			exclude:/node_modules/
		});
	}

	return {rules:loaders};
}