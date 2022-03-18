export declare class DAGReducerService {
    private readonly logger;
    private anconEndpoint;
    private pk;
    private url;
    private web3;
    private Ancon;
    private ethWeb3Prov;
    private wallet;
    private AnconNFTContract;
    private MarketPlaceContract;
    private firstTimeTopic;
    private dagChainReduxHandler;
    constructor();
    handleMintEvents(): Promise<void>;
    handleMakeOrder(): Promise<void>;
    handleCancelOrder(): Promise<void>;
    handleClaim(): Promise<void>;
}
