const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/e2e/stack-e2e',
    '<rootDir>/e2e/api-e2e',
    '<rootDir>/e2e/web-e2e',
    '<rootDir>/e2e/mobile-e2e',
  ],
}
