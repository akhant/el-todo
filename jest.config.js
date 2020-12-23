module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__test__/enzymeConfig.ts'],
  roots: ['<rootDir>/src/__test__'],
};
