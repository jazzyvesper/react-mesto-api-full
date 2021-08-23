module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
  },
};
