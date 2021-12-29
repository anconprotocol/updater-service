/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IDagContractTrustedReceiver,
  IDagContractTrustedReceiverInterface,
} from "../IDagContractTrustedReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "string",
        name: "parentCid",
        type: "string",
      },
      {
        internalType: "string",
        name: "newCid",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onDagContractResponseReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IDagContractTrustedReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IDagContractTrustedReceiverInterface {
    return new utils.Interface(_abi) as IDagContractTrustedReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDagContractTrustedReceiver {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IDagContractTrustedReceiver;
  }
}
