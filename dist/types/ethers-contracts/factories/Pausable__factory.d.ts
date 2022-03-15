import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Pausable, PausableInterface } from "../Pausable";
export declare class Pausable__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: any[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): PausableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Pausable;
}
