"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAGChainReduxHandler = void 0;
const jexl = require('jexl');
const assign = (val1, val2) => {
    return Object.assign(Object.assign({}, val1), val2);
};
const append = (key, val) => {
    return { [key]: val };
};
class DAGChainReduxHandler {
    constructor(rules, from, anconEndpoint) {
        this.rules = rules;
        this.from = from;
        this.anconEndpoint = anconEndpoint;
        jexl.addFunction('assign', assign);
        jexl.addFunction('append', append);
    }
    async handleEvent(evmEvent, topicContent, previousIndexContent) {
        console.log('[Handle Event beggining]');
        const rule = this.rules;
        const ruleset = rule[evmEvent.event];
        if (ruleset === null)
            return;
        let expectedRules = [];
        expectedRules = await ruleset.filter(async (r) => {
            return await jexl.eval(r.condition, evmEvent);
        });
        let output;
        if (expectedRules.length > 0) {
            expectedRules = await expectedRules.filter(async (r) => {
                return (await jexl.eval(r.blockFetchCondition, evmEvent)) === true;
            });
            output = expectedRules.map(async (r) => {
                const pastDagContent = previousIndexContent;
                const context = { dag: pastDagContent, newData: topicContent };
                const result = await jexl.eval(r.expression, context);
                return result;
            });
        }
        return Promise.all(output);
    }
}
exports.DAGChainReduxHandler = DAGChainReduxHandler;
//# sourceMappingURL=index.js.map