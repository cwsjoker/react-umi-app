const tinify = require('tinify');
const readline = require('readline');
const fs = require('fs-extra');
const { glob } = require('glob');
const path = require('path');
// const themeFolderPaths = require('./.themeFolderPaths');
const folderPaths = require('./.folderPaths');
// const { SiteKeys } = require('@hootool/site-config/dist/cjs/index.js');
const dayjs = require('dayjs');

// const isTheme = process.argv[2] === '--theme';
const key = fs.readFileSync(resolve('.key')).toString().trim();
const statFilePath = resolve('./statFile.js');
let statInfo = [];

// 创建readline接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cgreen = (msg) => `\x1b[32m${msg}\x1b[0m`;
const cred = (msg) => `\x1b[31m${msg}\x1b[0m`;
const cyellow = (msg) => `\x1b[33m${msg}\x1b[0m`;
const COUNT = 500;

function ask(str, cb) {
  rl.question(str, (answer) => {
    rl.close(); // 关闭readline接口
    cb?.(answer);
  });
}

function run() {
  tinify.key = key;
  tinify.validate(function (err) {
    if (err) throw err;

    console.log(cyellow(`每个月只有${COUNT}次压缩次数,本月剩余${COUNT - tinify.compressionCount}次，请谨慎使用`));

    // 本次要压缩的图片
    let imagePaths = setComporessData();

    // 跳过已经压缩过的图片
    const { compressedList, pureList } = checkStatFile(imagePaths);
    if (compressedList.length) {
      // 显示已经压缩过的图片
      console.log(cyellow(`本次压缩将会跳过已经压缩过的图片（${compressedList.length}张），如下：`));
      compressedList.slice(0, 3).forEach((item) => {
        logItem(item.path, item.originSize, item.compressedSize, item.rate);
      });
      if (compressedList.length > 3) {
        console.log('...');
        compressedList.slice(-3).forEach((item) => {
          logItem(item.path, item.originSize, item.compressedSize, item.rate);
        });
      }
      console.log(cyellow('====================='));

      imagePaths = pureList;
    }

    ask(`本次共压缩${cred(imagePaths.length)}张图片，按回车继续...`, () => {
      comporess(imagePaths);
    });
  });
}

run();

// 设置本次要压缩的图片
function setComporessData() {
  // const imageFolderPaths = isTheme ? themeFolderPaths : folderPaths;
  const imageFolderPaths = folderPaths;
  let imagePaths = [];

  // if (isTheme) {
  //   const siteImageFolderPaths = imageFolderPaths
  //     .map((p) => {
  //       let paths = [];

  //       SiteKeys.forEach((siteKey) => {
  //         if (['super291', '646jili', 'hot646'].includes(siteKey)) {
  //           return;
  //         }

  //         // 从src开始的路径
  //         const srcPath =
  //           siteKey === '291jili'
  //             ? `src/assets/images/${p}/**/*.{png,jpg,jpeg}`
  //             : `src/theme/themes/${siteKey}/assets/images/${p}/**/*.{png,jpg,jpeg}`;
  //         const globPaths = glob.sync(srcPath, { root: process.cwd() });
  //         paths = [...paths, ...globPaths];
  //       });

  //       return paths;
  //     })
  //     .flat();

  //   imagePaths = [...imagePaths, ...siteImageFolderPaths];
  // } else {
    imagePaths = imageFolderPaths
      .map((p) => {
        // 从src开始的路径
        const srcPath = `${p}/**/*.{png,jpg,jpeg}`;
        const paths = glob.sync(srcPath, { root: process.cwd() });
        return paths;
      })
      .flat();
  // }

  return imagePaths;
}

// 进行压缩
async function comporess(imagePaths) {
  const info = {
    list: [],
    time: null,
    count: 0,
    rate: 0,
  };
  let allOriginSize = 0;
  let allCompressedSize = 0;

  console.log(cgreen('开始压缩====================='));

  for (let i = 0; i < imagePaths.length; i++) {
    const path = imagePaths[i];
    if (fs.existsSync(path)) {
      const stat = fs.statSync(path);
      const originSize = (stat.size / 1024).toFixed(2);
      const source = tinify.fromFile(path);

      await source.toFile(path);
      const stat2 = fs.statSync(path);
      const compressedSize = (stat2.size / 1024).toFixed(2);

      allOriginSize += +originSize;
      allCompressedSize += +compressedSize;
      const rate = ((originSize - compressedSize) / originSize).toFixed(2);

      logItem(path, originSize, compressedSize, rate);

      info.list.push({
        path: winPathToLinuxPath(path), // win路径转linux路径，统一存储的格式
        originSize: originSize,
        compressedSize: compressedSize,
        rate: rate,
      });
    } else {
      console.log(cred(`文件不存在 ${path}`));
    }
  }

  if (info.list.length) {
    info.count = info.list.length;
    info.rate = ((allOriginSize - allCompressedSize) / allOriginSize).toFixed(2);
    info.count > 0 && createStatFile(info);
  }

  console.log(cgreen(`压缩结束，共压缩${info.rate * 100}%=========`));
}

// 检查已经压缩过的文件
function checkStatFile(imagePaths) {
  const result = {
    compressedList: [],
    pureList: [],
  };

  if (fs.existsSync(statFilePath)) {
    statInfo = require(statFilePath);

    // 从统计文件中读取已经压缩过的文件
    const allCompressedPathsMap = {};
    const allCompressed = statInfo.reduce((result, item) => {
      const list = item.list.filter((item2) => {
        // 去重
        const flag = !allCompressedPathsMap[item2.path];
        allCompressedPathsMap[item2.path] = item2;
        return flag;
      });

      const newResult = [...result, ...list];
      return newResult;
    }, []);

    const compressedList = allCompressed.filter((item) => imagePaths.some((path) => winPathToLinuxPath(path) === item.path));
    const pureList = imagePaths.filter((path) => !allCompressedPathsMap[winPathToLinuxPath(path)]);
    result.compressedList = compressedList;
    result.pureList = pureList;
  }

  return result;
}

// 生成压缩统计文件
function createStatFile(info) {
  if (info?.list?.length) {
    info.count = info.list.length;
    info.time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

    statInfo.push(info);
    fs.writeFileSync(statFilePath, `module.exports = ${JSON.stringify(statInfo, null, 2)};`);
  }
}

function logItem(path, originSize, compressedSize, rate) {
  console.log(`${path} ${cgreen(originSize + ' KB => ' + compressedSize + ' KB ' + (rate * 100).toFixed() + '%')}`);
}

function winPathToLinuxPath(path) {
  return path.replace(/\\\\/g, '/').replace(/\\/g, '/');
}

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}
