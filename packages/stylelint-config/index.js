module.exports = {
  defaultSeverity: 'error', // 默认换成wanring就行了,不需要控制太严格
  plugins: ['stylelint-scss'],
  rules: {
    /**
     * Possible errors
     * @link https://stylelint.io/user-guide/rules/#possible-errors
     */
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // a { }
    'block-no-empty': null,
    // a { color: #y3 }
    'color-no-invalid-hex': true,
    //  /* */
    'comment-no-empty': true,
    // a { color: pink; color: orange; },禁止相同属性名
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    // 禁止速记属性覆盖相关的普通属性。
    // a { background-repeat: repeat; background: green; }
    'declaration-block-no-shorthand-property-overrides': true,
    // a { font-family: serif, serif; }
    'font-family-no-duplicate-names': true,
    // 禁止在 calc 函数内使用无效的未空格操作符。
    // a { top: calc(1px + 2px); }
    'function-calc-no-unspaced-operator': true,
    // 禁止线性渐变函数中使用非标准方向值。
    // .foo { background: linear-gradient(to top, #fff, #000); }
    'function-linear-gradient-no-nonstandard-direction': true,
    // 关键帧声明中不允许使用无效的 !important。 @keyframes
    'keyframe-declaration-no-important': true,
    // 禁止使用未知的媒体特性名称。
    // @media (min-width: 700px) {}
    'media-feature-name-no-unknown': true,
    // 禁止低特异性的选择器在覆盖高特异性的选择器之后出现。
    // #container a { top: 10px; } a { top: 0; }
    'no-descending-specificity': null, // @reason 实际有很多这样用的，且多数人熟悉 css 优先级
    // 禁止重复的 @import 规则。
    // @import "a.css"; @import "a.css";
    'no-duplicate-at-import-rules': true,
    // .foo {} .bar {} .foo {}
    'no-duplicate-selectors': true,
    'no-empty-source': null,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ],
    'selector-pseudo-element-no-unknown': true,
    'string-no-newline': true,
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],

    /**
     * Stylistic issues
     * @link https://stylelint.io/user-guide/rules/list#stylistic-issues
     */
    indentation: 2,
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-before': 'always',
    'block-opening-brace-space-after': 'always-single-line',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'comment-whitespace-inside': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': [
      'always',
      {
        severity: 'error',
      },
    ],
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],
    'max-line-length': 100,
    'selector-max-id': 0,
    'value-list-comma-space-after': 'always-single-line',

    /**
     * stylelint-scss rules
     * @link https://www.npmjs.com/package/stylelint-scss
     */
    'scss/double-slash-comment-whitespace-inside': 'always',
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
};
