module.exports = {
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
  verbose: true,
  testURL: "http://localhost/8080",
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleDirectories: ["<rootDir>/src", "node_modules"],
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/src/components$1",
  },
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
