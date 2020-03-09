const ISDEV = process.env.NODE_ENV !== 'production'

/* eslint-disable functional/immutable-data */
module.exports = {
  presets: [
    [
      '@lightscript',
      {
        stdlib: {
          lodash: false
        },
        env: {
          targets: 'last 3 Chrome version, Firefox ESR',
          modules: false
        }
      }
    ],
  ],
  plugins: [
    'babel-plugin-macros',
    [
      'inline-replace-variables', { ISDEV }
    ],
    ['transform-rename-import',
      {
        original: '^(.+?)\\.lsc$', replacement: '$1.js'
      }
    ]    
  ]
}