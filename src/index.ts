// INFO: getUrlParams
const problem1 = (): void => {
  const getUrlParams = (
    pathString: string,
    patternString: string,
  ): Record<string, string> => {
    const PARAM_PREFIX = ':';
    const SEPERATOR = '/';
    const paths = pathString.split(SEPERATOR);
    const patterns = patternString.split(SEPERATOR);

    const isParam = (str: string): boolean => str.startsWith(PARAM_PREFIX);
    const result: Record<string, string> = {};

    for (let i = 0; i < paths.length; ++i) {
      const pathItem = paths[i];
      const patternItem = patterns[i];

      if (isParam(patternItem)) {
        // INFO: Param comparison
        if (!isParam(patternItem)) {
          return result;
        } else {
          const key: string = patternItem.replace(PARAM_PREFIX, '');
          result[key] = pathItem;
        }
      } else {
        // INFO: Static comparison
        if (pathItem === patternItem) {
          continue;
        } else {
          return result;
        }
      }
    }

    return result;
  };

  console.log('======= PROBLEM 1 =======');
  // INFO: Test cases
  const pattern = 'staticOne/:paramOne/staticTwo/staticThree/:paramTwo';
  // Test 1: does not match the first static part: staticOne <> staticZero, returns {}
  console.log('TEST 1', getUrlParams('staticZero/one', pattern));

  // Test 2: matched the first static and param part, returns {paramOne: 'one'}
  console.log('TEST 2', getUrlParams('staticOne/one', pattern));

  // Test 3: matched the first static and param part with extra, returns {paramOne: 'one'}
  console.log(
    'TEST 3',
    getUrlParams('staticOne/one/staticThree/three', pattern),
  );

  // Test 4: matched the first, second and third static + param parts
  // returns {paramOne: 'one', paramTwo: 'two'}
  console.log(
    'TEST 4',
    getUrlParams('staticOne/one/staticTwo/staticThree/two', pattern),
  );

  // Test 5: empty pattern string, returns {}
  console.log(
    'TEST 5',
    getUrlParams('staticOne/one/staticTwo/staticThree/two', ''),
  );

  // Test 6: empty path string, returns {}
  console.log('TEST 6', getUrlParams('', pattern));
};

// INFO: objectLiteral
const problem2 = () => {
  type ObjectLiteralResult = Record<string, Record<string, any>>;

  const objectLiteral = (
    before: Record<string, any>,
    after: Record<string, any>,
  ): ObjectLiteralResult => {
    const keyValuePairsBefore = Object.entries(before);
    const keyValuePairsAfter = Object.entries(after);

    const keyValuePairs =
      keyValuePairsBefore.length > keyValuePairsAfter.length
        ? keyValuePairsBefore
        : keyValuePairsAfter;

    const result: Record<string, any> = {};

    for (const pair of keyValuePairs) {
      const [key, _] = pair;
      const beforeValue = before[key];
      const afterValue = after[key];

      if (beforeValue !== afterValue) {
        result[key] = { old: beforeValue, new: afterValue };
      }
    }

    return result;
  };

  // INFO: Test cases
  const test1 = (): void => {
    type Data = { id: string; name?: string; count: number };

    const before: Data = { id: '1', count: 0 };
    const after: Data = { id: '1', name: 'khan', count: 1 };
    // should return {name: {old: undefined, new: 'khan'}, count: {old: 0, new: 1}}
    console.log('TEST 1', objectLiteral(before, after));
  };

  const test2 = (): void => {
    type Data = { id?: number; count?: number | string };

    const before: Data = {};
    const after: Data = { id: 1, count: 1 };
    // should return { id: { old: undefined, new: 1 }, count: { old: undefined, new: 1 } }
    console.log('TEST 2', objectLiteral(before, after));
  };

  const test3 = (): void => {
    type Data = { id?: string; record: null | object };

    const before: Data = { record: null };
    const after: Data = { id: '1', record: { hello: 'kitty' } };
    // should return { id: { old: undefined, new: '1' } }, count: { old: null, new: { record: 'kitty' } }
    console.log('TEST 3', objectLiteral(before, after));
  };

  // INFO: Run tests
  console.log('======= PROBLEM 2 =======');
  test1();
  test2();
  test3();
};

problem1();
problem2();
