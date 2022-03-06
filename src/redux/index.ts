import { ethers } from 'ethers';
import Web3 from 'web3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jexl = require('jexl');

const assign = (val1, val2) => {
  return { ...val1, ...val2 };
};

const append = (key, val) => {
  return { [key]: val };
};

export class DAGChainReduxHandler {
  constructor() {
    // helper functions
    jexl.addFunction('assign', assign);
    jexl.addFunction('append', append);
  }

  async handleEvent(jexlSmartContractRules: any, evmEvent: any): Promise<any> {
    // Lookup by event
    const rule = jexlSmartContractRules;
    const ruleset = rule[evmEvent.event];

    // Lookup by condition
    let expectedRules = [];
    expectedRules = await ruleset.filter(async (r) => {
      return await jexl.eval(r.condition, evmEvent);
    });

    // Lookup by DAG block condition, note this could be a single liner
    if (expectedRules.length > 0) {
      expectedRules = await expectedRules.filter(async (r) => {
        return (await jexl.eval(r.blockFetchCondition, evmEvent)) === true;
      });
      expectedRules.map(async (r) => {
        const queryAddress = await jexl.eval(r.blockFetchAddress, evmEvent);
        // TODO: Fetch topic + queryAddress eg Waku, Swarm Bee or Ancon protocol
        const dagExample = {};
        const dagContent = dagExample.content;
        const context = { dag: dagContent, tx: evmEvent };
        const result = await jexl.eval(r.expression, context);
        // TODO: Mutate topic + Sign
        return { result: result, rule: r, signedBlock: {} };
      });

      return true; // TODO: return result
    }
  }
}
