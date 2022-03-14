// eslint-disable-next-line @typescript-eslint/no-var-requires
const jexl = require('jexl');

const assign = (val1, val2) => {
  return { ...val1, ...val2 };
};

const append = (key, val) => {
  return { [key]: val };
};

export class DAGChainReduxHandler {
  constructor(
    private rules: any,
    private from: string,
    private anconEndpoint: string,
  ) {
    // helper functions
    jexl.addFunction('assign', assign);
    jexl.addFunction('append', append);
  }

  async handleEvent(
    evmEvent: any,
    topicContent: any,
    previousIndexContent: any,
  ): Promise<any> {
    console.log('[Handle Event beggining]');
    // Lookup by event
    const rule = this.rules;
    const ruleset = rule[evmEvent.event];

    if (ruleset === null) return;

    // Lookup by condition
    let expectedRules = [];
    expectedRules = await ruleset.filter(async (r) => {
      return await jexl.eval(r.condition, evmEvent);
    });
    let output;
    // Lookup by DAG block condition, note this could be a single liner
    if (expectedRules.length > 0) {
      expectedRules = await expectedRules.filter(async (r) => {
        return (await jexl.eval(r.blockFetchCondition, evmEvent)) === true;
      });

      output = expectedRules.map(async (r) => {
        const queryAddress = await jexl.eval(r.blockFetchAddress, evmEvent);

        const pastDagContent = previousIndexContent;

        const context = { dag: pastDagContent, newData: topicContent };
        const result = await jexl.eval(r.expression, context);
        // TODO: Mutate topic + Sign
        return result;
      });
    }
    return Promise.all(output);
  }
}
