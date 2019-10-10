module.exports = (api) => {
  api.cache(false);

  const presets = [
    '@babel/preset-env',
  ];

  const plugins = [
    '@babel/plugin-transform-for-of',
    '@babel/plugin-proposal-class-properties',
  ];

  return { presets, plugins };
};
