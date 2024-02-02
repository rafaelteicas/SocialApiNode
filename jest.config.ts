import { type Config } from 'jest'

const config: Config = {
  rootDir: '.',
  collectCoverageFrom: ['src/presentation/controllers'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

export default config
