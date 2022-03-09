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
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

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

  const anconUrl = conf.get('ANCON_URL_TENSTA');

  const moniker = keccak256(toUtf8Bytes(conf.get(`DAG_STORE_MONIKER`)));
  const url = conf.get('BSC_TESTNET');
  const provider = new ethers.providers.JsonRpcProvider(url);
  const network = await provider.getNetwork();
  console.log('[GET NETWORK]', network);

  const pk = conf.get(`DAG_STORE_KEY`);
  const signer = new ethers.Wallet(Web3.utils.hexToBytes(pk));
  const web3 = new Web3(provider as any);

  // const a = new ethers.providers.Web3Provider(provider, network);

  // console.log('[WEB 3]', web3);

  // let nftContract, marketContract;
  const { AnconNFTContract, MarketPlaceContract } = helper.getContracts(
    signer,
    web3,
  );

  console.log('[Suscribing to NFT mint]');

  const nftSuscription = await web3.eth
    .subscribe(
      'logs',
      {
        address: conf.get('AnconTestNFTAddress'),
        topics: [
          '0x0a59a585b9550719952b099b96c48342a827bee7469998fdbdfb68477e412931',
        ],
      },
      function (error, result) {
        if (!error) {
          console.log('[RESULT]', result);

          return;
        }

        console.error('[ERROR]', error);
      },
    )
    .on('connected', function (subscriptionId) {
      console.log('[SUB ID]', subscriptionId);
    })
    .on('data', function (blockHeader) {
      console.log('[BLOCKHEADER]', blockHeader);
    })
    .on('error', console.error);

  // nftSuscription
  console.log('[Suscribe NFT Res]', nftSuscription);

  console.log('[Instance ANCON]');
  //const Ancon = new AnconProtocol(
  //  null,
  //  signer.address,
  //  '',
  //  'https://tensta.did.pa/v0/',
  //  '',
  //  '',
  //);

  if (false) {
    // anconPostMetadata(signer.address, '', provider, anconUrl, Ancon);
  }

  // console.log('[NFT contract events]', AnconNFTContract.events);
  // console.log('[NFTEX contract events]', MarketPlaceContract.events);
};

main().then();
