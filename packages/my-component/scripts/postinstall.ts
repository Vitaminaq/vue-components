import { isVue3, version } from "vue-demi";
import fse from "fs-extra";
import path from "path";

console.log("当前主项目vue版本：", version);

const dirname = isVue3 ? "vue3" : "vue2";

const switchVersion = async () => {
  try {
    const rootSrc = path.join(__dirname, `../dist`);
    const libSrc = path.join(rootSrc, `./${dirname}`);
    const libDest = path.join(libSrc, "../..");
    fse.copySync(libSrc, libDest);

    // const typeSrc = path.join(rootSrc, `./types/${dirname}`);
    // const typeDest = path.join(libSrc, "../vue-types");
    // fse.copySync(typeSrc, typeDest);
    console.log("组件库版本切换成功，请放一万个心使用！！！");
  } catch (e) {
    console.log("组件库版本切换失败！！！");
  }
};

switchVersion();
