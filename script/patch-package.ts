import { getPackageInfo, resolveModule } from "local-pkg";
import fs from "node:fs/promises";

const patch = async () => {
  const { name, version, rootPath } = await getPackageInfo("vue-template-compiler");
  console.log(`检测到当前${name}版本为${version}`);
  const packagePath = await resolveModule("vue-template-compiler");

  const content = await fs.readFile(packagePath, "utf8");

  try {
    await fs.writeFile(
      packagePath,
      content.replace(
        "require('vue').version",
        `require('vue@${version}').version`
      )
    );
    console.log(`vue@${version}版本写入成功`);
    console.log('写入路径：', rootPath);
  } catch (e) {
    console.log(`vue@${version}版本写入失败，请检测包脚本是否需要更新`);
  }
};

patch();
