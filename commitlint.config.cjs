const { type } = require('os')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Ignore merge commits
  ignores: [(msg) => msg.startsWith('Merge ')],
  // Custom rules
  rules: {
    // --- Commit type ---
    'type-case': [2, 'always', 'lower-case'], // Lowercase for commit type
    'type-empty': [2, 'never'], // Type must not be empty
    'type-enum': [
      2,
      'always',
      [
        'build', // Changes to the build process
        'chore', // Maintenance tasks
        'ci', // Continuous integration
        'docs', // Documentation changes
        'feat', // New features
        'fix', // Bug fixes
        'perf', // Performance improvements
        'refactor', // Code changes that do not affect functionality
        'revert', // Reversions of previous changes
        'style', // Code style changes
        'test', // Test-related changes
      ],
    ],

    // --- Subject ---
    'subject-case': [2, 'always', 'lower-case'], // The subject must be lowercase
    'subject-empty': [2, 'never'], // The subject must not be empty
    'subject-full-stop': [2, 'never', '.'], // The subject must not end with a period
  },
}
