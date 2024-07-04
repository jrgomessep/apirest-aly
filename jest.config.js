const config = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/mocks/(.+)': '<rootDir>/tests/mocks/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/src/config/prisma-client.ts']
}

module.exports = config
