// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every tests
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.js', '!**/testUtils.js', '!src/components/**/stories/*.stories.js'],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  moduleNameMapper: {
    '@src(.*)$': '<rootDir>/src/$1',
    '@(containers|components|services|selectors|reducers|utils|themes)(.*)$': '<rootDir>/src/$1/$2',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/image.js',
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/__mocks__/cssModule.js'
  },

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'src'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each tests
  setupFilesAfterEnv: ['./jest.setup.js'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.js': '<rootDir>/node_modules/babel-jest'
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],

  // Whether to use watchman for file crawling
  watchman: true
};
