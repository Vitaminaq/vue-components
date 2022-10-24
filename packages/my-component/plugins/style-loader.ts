import { Plugin } from "vite";
export default (): Plugin => {
  let config;

  return {
    name: "style-loader",
    apply: "build",
    enforce: "pre",
    configResolved(cf) {
      config = cf;
    },
    async resolveId(id, importer, options) {
        const resolution = await this.resolve(id, importer, {
          skipSelf: true,
          ...options,
        });
        if (!resolution) return null;

        const { id: url } = resolution;

        this.getFileName = (fileReferenceId: string) => {
            console.log(fileReferenceId, '8888888888888888');
            return fileReferenceId;
        };
        return url;
    }
  };
};
