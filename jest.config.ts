import { type Config } from 'jest'

const config: Config = {
  collectCoverageFrom: ['src/{presentation, data}/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

export default config
