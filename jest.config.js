module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/__test__/enzymeConfig.ts'],
  roots: ['<rootDir>/src/__test__']
};