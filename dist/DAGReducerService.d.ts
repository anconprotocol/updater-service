export declare class DAGReducerService {
    private readonly logger;
    private AnconNFTContract;
    private anconEndpoint;
    private pk;
    private url;
    private web3;
    private Ancon;
    private ethWeb3Prov;
    private wallet;
    private MarketPlaceContract;
    private firstTimeTopic;
    private dagChainReduxHandler;
    constructor();
    handleAllEvents(): Promise<void>;
}
