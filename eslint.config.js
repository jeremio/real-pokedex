import antfu from '@antfu/eslint-config'

export default antfu({
  pnpm: true,
  vue: true,
  rules: {
    'vue/block-order': ['error', {
      order: [['template', 'script'], 'style'],
    }],
    'no-console': 'off',
  },
})
