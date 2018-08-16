var path=require("path");

var webpack=require("webpack");
var VueLoaderPlugin=require("vue-loader/lib/plugin");
var ParallelUglifyPlugin=require("webpack-parallel-uglify-plugin");
var HtmlWebpackPlugin=require("html-webpack-plugin");
var BundleAnalyzerPlugin=require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const _default={
	development:[new webpack.HotModuleReplacementPlugin()],
	production:[new webpack.optimize.ModuleConcatenationPlugin(),new ParallelUglifyPlugin({
		uglifyJS:{
			output:{
				beautify:false,
				comments:false
			},
			compress:{
				warnings:false,
				drop_console:true,
				collapse_vars:true,
				reduce_vars:true
			}
		}
	})]
};

const _features={
	vue:()=>{
		return [new VueLoaderPlugin()];
	},
	analyzer:()=>{
		return [new BundleAnalyzerPlugin()];
	},
	html:(mode,names,project)=>{
		return names.map((name)=>{
			return new HtmlWebpackPlugin({
				filename:`./views/${name}.html`,
				template:path.resolve(process.cwd(),`./projects/${project}/templates/${name}.ejs`),
				inject:false,
				hash:true,
				cache:true,
				chunks:[name],
				templateParameters:function(compilation,assets,options){
					return {
						name:name,
						chunks:((mode)=>{
							var resources=[];
							
							switch(mode){
								case "development":
									resources=assets.js;
									break;
								case "production":
									resources=assets.js.map((a)=> a.replace(/^\/dist\/js\//,"//static.iqiyi.com/js/common/"));
									break;
								default:
									resources=assets.js;
									break;
							}

							return resources;
						})(mode),
						mode:mode
					}
				}
			});
		});
	}
};

module.exports=function(mode,entries,features,project){
	return features.reduce((acc,type)=>{
		return acc.concat(_features[type]?_features[type](mode,Object.keys(entries),project):[]);
	},_default[mode]);
};