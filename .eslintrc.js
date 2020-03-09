module.exports = {
    parser: '@lightscript/eslint-plugin',
    parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@lightscript/recommended',
    'plugin:functional/all',
  ],
  globals: {

  },
  env: {
    node: true,
    browser: true,
    es6: true,
    webextensions: true,
    greasemonkey: true,
  },
  settings: {
  },
  plugins: [
    '@lightscript/eslint-plugin',
    'functional',
  ],
  rules: {
    '@lightscript/no-unnecessary-comma': 'off',
    'array-callback-return': 'error',
    'callback-return': 'error',
    'complexity': ['error', 4],
    'eqeqeq': 'error',
    'functional/no-conditional-statement': 'off',
    'functional/no-expression-statement': 'off',
    'functional/functional-parameters': 'off',    
    'functional/no-promise-reject': 'off',    
    'guard-for-in': 'error',
    'handle-callback-err': 'error',
    'max-depth': ['error', 3],
    'max-lines-per-function': [
      'error',
      {
        max: 20,
        skipComments: true
      }
    ],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 4],
    'max-statements': ['error', 8],
    'max-statements-per-line': [
      'error',
      {
        max: 1
      }
    ],
    'no-alert': 'error',
    'no-await-in-loop': 'error',
    'no-buffer-constructor': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-eq-null': 'error',
    'no-lonely-if': 'error',
    'no-magic-numbers': [
      'error',
      {
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: true,
        ignore: [0, 1, 2, 3]
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      }
    ],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-new-require': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-path-concat': 'error',
    'no-plusplus': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-shadow': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'off',
    'no-undefined': 'error',
    'no-undef-init': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-vars': ['error', {'args': 'after-used', 'argsIgnorePattern': '_' }],
    'no-use-before-define': ['error', { 'functions': false}],
    'no-useless-constructor': 'error',
    'no-useless-computed-key': 'error',
    'no-unreachable': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
        allowTaggedTemplates: true,
        allowShortCircuit: true,
      }
    ],
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: true,
      }
    ],
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-shorthand': 'error',
    'operator-assignment': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false
      }
    ],
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }
    ],
    'radix': 'error',
    'require-atomic-updates': 'error',
    'require-unicode-regexp': 'error',
    'rest-spread-spacing': ['error', 'never'],
    'require-await': 'error',
    'semi': [
      'error',
      'never',
    ],
    'space-infix-ops': 'error',
    'space-in-parens': ['error', 'never'],
    'symbol-description': 'error',
    'yoda': 'error',
    'wrap-iife': ['error', 'inside'],
  }
}