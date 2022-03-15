export declare class DAGChainReduxHandler {
    private rules;
    private from;
    private anconEndpoint;
    constructor(rules: any, from: string, anconEndpoint: string);
    handleEvent(evmEvent: any, topicContent: any, previousIndexContent: any): Promise<any>;
}
