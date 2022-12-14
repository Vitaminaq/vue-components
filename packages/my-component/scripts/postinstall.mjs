import { isVue3, version } from "vue-demi";
import fse from "fs-extra";
import path from "node:path";
import { fileURLToPath } from 'node:url'

console.log("当前主项目vue版本：", version);

const dirname = isVue3 ? "vue3" : "vue2";

const clean = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  await fse.emptyDir(path.resolve(__dirname, '../es'));
  await fse.emptyDir(() => path.resolve(__dirname, '../cjs'));
}

const switchVersion = async () => {
  try {
    await clean();
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const rootSrc = path.join(__dirname, `../dist`);
    const libSrc = path.join(rootSrc, `./${dirname}`);
    const libDest = path.join(libSrc, "../..");
    await fse.copySync(libSrc, libDest);

    console.log("组件库版本切换成功，请放一万个心使用！！！");
  } catch (e) {
    console.log("组件库版本切换失败！！！", e);
  }
};

switchVersion();
