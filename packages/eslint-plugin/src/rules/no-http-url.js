const RULE_NANE = 'no-http-url';

module.exports = {
  name: RULE_NANE,
  meta: {
    type: 'suggestion',
    fixable: null,
    messages: {
      noHttpUrl: 'Recommended "{{url}}" switch to HTTPS',
    },
  },
  create(context) {
    return {
      Literal: function handleRequires(node) {
        if (
          node.value &&
          typeof node.value === 'string' &&
          node.value.indexOf('http:') === 0
        ) {
          context.report({
            node,
            messageId: 'noHttpUrl',
            data: {
              url: node.value,
            },
          });
        }
      },
    };
  },
};
