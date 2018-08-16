# H5-Activity-Projects

## Pre-request

全局安装:

- webpack 4.*
安装命令：npm install -g webpack
- node 8.9.0+
- webpack-dev-server
安装命令：npm install -g webpack-dev-server
- webpack-cli (webpack 4.0以上版本单独提出了 cli 模块)
安装命令：npm install -g webpack-cli

修改本地`dns`配置

```
127.0.0.1 dev.iqiyi.com
```

## Install

安装相关依赖.

```shell
npm install
```

## Directory Structure

```
.

   ├── commons
   ├── conf        // webpack 配置  
   ├── projects        // 项目集合
   |   ├── project_1       // 活动名称
   |   |   ├── entries
   |   |   |      ├── page_1 //
   |   |   |           ├── index.js    //  入口js (app.js,index.js,main.js 均可)  
   |   |   └── templates
   |   |   |      ├── page_1.ejs
   ├── scripts    //项目启动脚本

```

> 备注:
1. 活动页入口文件 app.js, index.js main.js 均可;
2. templates 文件名需和 entries 目录下相应子目录名保持一致;
3. 项目打包的bundle js 名为 [name].bundle.js 其中[name] 和template 文件名一致;

## 启动开发环境 (指定项目)
> 注: 在启动开发环境前，首先要把本地host配置好，其次是必须先创建好子模块，子模块的创建可见下方“创建子模块”部分

```shell
# 对demo 项目,开启es6开发模式
sudo ./scripts/start-default.sh demo

# 对demo 项目开启 vue 开发模式
sudo ./scripts/start-vue.sh demo
```

> 注: 因为开启的是80端口, linux 下需要使用 root 权限, windows 系统 直接在git bash 下开启,无需 sudo 命令.（vscode里默认的是cmd命令，注意是在git bash下输入命令，可自行配置或者直接使用git bash.exe进行启动）

> 注: 构建后的地址例子为 dev.iqiyi.com/dist/views/<project name>.html，例如 http://dev.iqiyi.com/dist/views/es6case.html

## 打包 (指定项目)

```shell
# es6 模式
./scripts/build-default.sh demo
./scripts/build-analyzer.sh demo # 开启 analyzer 工具看各模块占比

# vue 模式
./scripts/build-vue.sh demo
./scripts/build-vue-analyzer.sh demo  # vue 模式下开启 analyzer
```

> 注: 打包后的生成的html文件脚本默认情况下会写成 static.iqiyi.com/common/ 为域名


# git submodule 操作

## 创建子模块

**Pre-request**

>
  建立主库
  建立子库

在主库上添加对子项目的引用:

```shell
# localpath 用来控制子库在主库的本地路径
git submodule add <address> <localpath>
```

## clone 含有子模块的主库

当我们`clone`一个包含有子模块的主库时,默认会包含子模块的目录,但其中没有任何文件;

之后需要初始化本地配置文件,并抓取子模块内容;

*初始化本地配置文件*
```shell
# 该命令会修改 .git/config 的配置,添加 submodule 的信息
git submodule init
```

*更新子模块内容*
```shell
# 更新目标子模块内容
git submodule update <localpath>

# 简单的全部更新
git submodule update

# 更便捷的方式
git clone <address> --recursive
```

## 在包含子模块的项目上协作

**拉取子模块更新**

```shell
# 进入子模块目录下
git fetch
git merge origin/master

# 回到主目录下
git diff
# 可以看到子模块的修改

# 提交主目录
git add <path>
git commit -m "xxx"
git push origin master
```

或者用update 的方式

```shell
# 在主库下面
git fetch origin master
git merge origin/master

# 更新依赖信息 切记一定要做, 否则会提交旧的依赖信息
git submodule update <localpath>
```

**发布子模块的改动**

当子模块上存在改动的时候:

1. 进入每一个改动的子模块中,然后手动推送到远程仓库;
2. 更新主目录的仓库;

> 默认的 `git submodule update` 会将branch 切换到一个游离的分支,所以在修改前切记一定要切换到实际分支后提交信息;


## 代码的git提交

1. 此项目主要分为两个分支，base基础库分支和master分支，其中master分支主要存储各个活动项目代码，base分支存储底层框架基础代码，clone下的代码是base分支代码
2. 开发前，在本地checkout新分支
3. 开发后，先commit本地代码，如没有基础库文件改动，可直接提交到gitlab；如有基础库改动，在base分支上新开hotfix分支，修改并确认无bug时merge到base分支（注意：base分支只有基础库代码，不含任何业务代码；base分支建议使用git pull --rebase保持主分支的清洁）
4. 代码通过测试后，需要将本地分支的代码merge到master分支，进行代码review后方可上线
5. 代码提交过程中，建议多提交，少推送，保持主base分支的整洁，少用或者禁用fast-forward模式，合并的时候使用--no-ff参数，尽量避免交叉合并的情况出现

git 分支示意图：

```
                /---  master分支，存储所有的活动业务代码 
  ———base分支——|
                \---  业务代码分支  
                \--- hotfix分支，主要用来修改公共的库文件代码，修改并确认无bug后merge到base分支       
   
```