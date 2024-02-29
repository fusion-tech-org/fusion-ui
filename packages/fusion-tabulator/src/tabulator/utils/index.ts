export const safeExec = (code: string) => {
  const proxyWindow = new Proxy(window, {
    get(target, prop: any, receiver: any) {
      const forbiddenProps = ['open', 'location', 'doccument'];

      if (forbiddenProps.includes(prop)) {
        throw new Error(`Attempted to access forbidden property '${prop}'`);
      }

      if (prop === 'window') {
        return proxyWindow;
      }

      return Reflect.get(target, prop, receiver);
    },
    // set() {}
  });

  new Function('window', `with(window) ${code}`)(proxyWindow, null);
};

export function simpleExecExpression(expression: string) {
  return new Function(`return ${expression};`);
}

/**
 * @desc Converting one custom expression to executable expression
 *
 * @export
 * @param {string} expression custom expression, for example: `([columnName] + [columnName]) * [columnName]`
 * @param {Record<string, any>} fieldMap data map, for example: `{ age: 18, score: 90 }` etc.
 * @return {string}
 */
export function convertExpressionByRule(
  expression: string,
  fieldMap: Record<string, any>,
  isMathCalc = false
) {
  const convertedRule: string = expression.replace(/\[(.*?)\]/g, (match) => {
    const field = match.replace(/(\[|\])/g, '');

    if (isMathCalc) {
      return fieldMap[field] || 'NaN';
    }

    if (!fieldMap[field]) return 'undefined';

    return fieldMap[field];
  });

  return convertedRule;
}
