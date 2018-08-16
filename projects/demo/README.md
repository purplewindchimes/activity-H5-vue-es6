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
```
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
