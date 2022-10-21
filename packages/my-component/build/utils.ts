import path from "path";

export const resolve = (str: string) => {
  return path.resolve(process.cwd(), str)
}