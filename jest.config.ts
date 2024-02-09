import { type Config } from 'jest'

const config: Config = {
  collectCoverageFrom: ['src/{data, domain}/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

export default config
