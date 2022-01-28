module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: [
    '<rootDir>/tests/**/*.feature.ts',
    '<rootDir>/tests/**/*.spec.ts'
  ],
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
    '^@tests/(.*)': '<rootDir>/tests/$1',
  }
}