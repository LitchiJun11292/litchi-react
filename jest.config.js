module.exports = {
  /** 文件扩展名数组,从左到右的顺序查找 */
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  /** 忽略不需要测试的文件路径 */
  testPathIgnorePatterns: ["/node_modules/"],
  /** 转换器映射 */
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  /** 需要收集覆盖信息的文件 */
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!**/node_modules/**",
  ],
  /** 指定测试结果最低阈值 */
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  /** 要从所需模块的位置向上递归搜索的目录名称数组 */
  moduleDirectories: ["node_modules", "src"],
  /** 模块名称映射器 */
  moduleNameMapper: {
    ".*\\.(css|less|styl|scss|sass)$": "<rootDir>/jest/cssMock.spec.js",
    ".*\\.(jpg|jpeg|png|gif|eof|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/fileMock.spec.js",
  },
  /** 匹配测试文件的路径 */
  testRegex: "/jest/.*\\.(test|spec)\\.(ts|js)$",
};
