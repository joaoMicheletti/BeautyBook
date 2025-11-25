module.exports = function override(config, env) {
  // remove ESLint completely in build
  config.module.rules = config.module.rules.map(rule => {
    if (rule.use && rule.use.some(u => u.options && u.options.eslintPath)) {
      return { ...rule, use: [] };
    }
    return rule;
  });

  return config;
};
