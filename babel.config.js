module.exports = { // eslint-disable-line functional/immutable-data
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: 'firefox esr, last 3 Chrome versions'
      }
    ]
  ],
  plugins: [
    'babel-plugin-macros',
    [
      'inline-replace-variables',
      {
        ISDEV: process.env.NODE_ENV !== 'production'
      }
    ]
  ]
}