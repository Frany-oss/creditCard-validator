module.exports = {
  verbose: true,
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  preset: "ts-jest",
  testTimeout: 30000,
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};