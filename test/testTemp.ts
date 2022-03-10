import { ethers } from 'ethers';
import {
  arrayify,
  base64,
  formatBytes32String,
  hexlify,
  keccak256,
  toUtf8Bytes,
} from 'ethers/lib/utils';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import helper from '../src/utils/helper';
import { JsonRpcProvider } from '@ethersproject/providers';
import AnconProtocol from '../src/utils/AnconProtocol';
import { DAGChainReduxHandler } from '../src/redux';
import fetch from 'node-fetch';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const rules = {
  AddMintInfo: [
    {
      name: 'concatTransactionHash',
      condition: `returnValues.creator != null`,
      expression: `assign(dag, append('txHash', tx.transactionHash))`,
      blockFetchCondition: 'returnValues.uri != null',
      blockFetchAddress: 'returnValues.creator',
      topicName: '@mintIndex',
    },
  ],
};

const anconPostMetadata = async (
  _address,
  _uuid: string,
  _ethrProv: JsonRpcProvider,
  _anconUrl: string,
  Ancon: AnconProtocol,
) => {
  //user Ancon ethers instance
  const signer = await _ethrProv.getSigner();
  const network = await _ethrProv.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;
  // const primarySource = `${_anconUrl}/v0/file/${_uploadFileRes.cid}/`;
  const payload = {
    data1: 'data1',
    data2: 'data2',
  };

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  // sign the message
  const signature = await signer.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(payload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: payload,
      topic: `mintIndex`,
    }),
  };

  // UPLOADING the metadata
  const PostRequest = async () => {
    console.log(
      'Requesting Ancon metadata creation, posting Ancon metadata...',
    );

    const metadataPost = await Ancon.postProof('dagjson', requestOptions);

    // // returns the metadata cid
    console.log('metadata', metadataPost);
    const id = await metadataPost.proofCid;

    return metadataPost;
  };

  return await PostRequest();
};

const main = async () => {
  const conf = new ConfigService();

  const anconEndpoint = conf.get('ANCON_URL_TENSTA');

  const moniker = keccak256(toUtf8Bytes(conf.get(`DAG_STORE_MONIKER`)));
  const url = conf.get('BSC_TESTNET');
  const jRPCprovider = new ethers.providers.JsonRpcProvider(url);
  // const network = await jRPCprovider.getNetwork();
  const pk = conf.get(`DAG_STORE_KEY`);
  const wallet = new ethers.Wallet(Web3.utils.hexToBytes(pk));

  const web3 = new Web3(url);
  const ethWeb3Prov = new ethers.providers.Web3Provider(
    web3.currentProvider as any,
  );

  const { AnconNFTContract, MarketPlaceContract } = helper.getContracts(
    wallet,
    web3,
  );
  const dagChainReduxHandler = new DAGChainReduxHandler(
    rules,
    wallet.address,
    anconEndpoint,
  );

  console.log('[Instance ANCON]');
  const Ancon = new AnconProtocol(ethWeb3Prov, wallet.address, anconEndpoint);

  await Ancon.initialize();

  // const netWork = await Ancon.getNetwork();
  const network = await Ancon.getNetwork();
  console.log('[ANCON network]', network);

  const { has, name } = await Ancon.getDomainName();

  console.log('[ANCON Domain Name]', name);

  const topicRes = await fetch(
    `${anconEndpoint}v0/topics?topic=uuid:f72f96a3-b215-4d76-ad2d-afdcd61d0a48&from=0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6`,
  );

  const topicResJson = await topicRes.json();

  console.log(topicResJson);

  setInterval(async () => {
    const currentBlock = await web3.eth.getBlockNumber();
    const allEvents = await AnconNFTContract.getPastEvents('AddMintInfo', {
      toBlock: currentBlock,
      fromBlock: currentBlock - 3,
    });
    console.log('\n[FROM]', currentBlock - 3, '[TO]', currentBlock);
    console.log('[Events batch lenght]', allEvents.length);
    console.log('[Event batch]', allEvents, '\n');
    allEvents.map((evt) => {
      dagChainReduxHandler.handleEvent(evt);
    });
  }, 5000);

  if (false) {
    // anconPostMetadata(signer.address, '', provider, anconUrl, Ancon);
  }

  // console.log('[NFT contract events]', AnconNFTContract.events);
  // console.log('[NFTEX contract events]', MarketPlaceContract.events);
};

main().then();
