1、在compressImages目录下创建.key文件，填入tinify key，若无key则前往 https://tinypng.com/developers 注册获取

2、在compressImages目录下创建.folderPaths.js，填入需要压缩的文件夹路径，用于压缩指定文件夹下的图片，示例如下：
```js
// 填入的目录从项目根目录开始
module.exports = [
  'src/assets/images/account'
]
```

3、在compressImages目录下创建.themeFolderPaths.js，填入需要压缩的主题文件夹路径，用于压缩所有主题下指定文件夹下的图片，示例如下：
```js
// 填入“./src/theme/themes/*/assets/images/”下的目录
module.exports = [
  'task'
]
```

4、项目根目录下运行命令：
```bash
# 压缩指定文件夹下的图片（读取.folderPaths.js的配置）
node ./scripts/compressImages/index.js

# 压缩所有主题下指定文件夹的图片（读取.themeFolderPaths.js的配置）
node ./scripts/compressImages/index.js --theme
```

5、本脚本对图片显示的单位是KB

6、自动生成的statFile.js文件需要上传到git仓库，用于下次压缩时跳过已经压缩过的图片
