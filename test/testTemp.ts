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
import AnconProtocol, { sleep } from '../src/utils/AnconProtocol';
import { DAGChainReduxHandler } from '../src/redux';
import fetch from 'node-fetch';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const rules = {
  AddMintInfo: [
    {
      name: 'concatTransactionHash',
      condition: `returnValues.creator != null`,
      expression: `assign(dag, append(newData.uuid, newData))`,
      blockFetchCondition: 'returnValues.uri != null',
      blockFetchAddress: 'returnValues.creator',
      topicName: '@mintIndex',
    },
  ],
};

const anconPostMetadata = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  payload: any,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  // sign the message
  //Current error in signature
  const signature = await _wallet.signMessage(
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
      topic: `@mintIndex`,
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

const instanceWeb3WithAccount = (_url: string, pk: string) => {
  const web3 = new Web3(_url);
  const web3Account = web3.eth.accounts.privateKeyToAccount(pk);
  web3.eth.accounts.wallet.add(web3Account);
  return web3;
};

const main = async () => {
  const conf = new ConfigService();

  const anconEndpoint = conf.get('ANCON_URL_TENSTA');
  const pk = conf.get(`DAG_STORE_KEY`);
  const url = conf.get('BSC_TESTNET');

  // const moniker = keccak256(toUtf8Bytes(conf.get(`DAG_STORE_MONIKER`)));
  // const jRPCprovider = new ethers.providers.JsonRpcProvider(url);
  // const network = await jRPCprovider.getNetwork();
  const web3 = instanceWeb3WithAccount(url, pk.split('0x')[1]);

  const ethWeb3Prov = new ethers.providers.Web3Provider(
    web3.currentProvider as any,
  );

  const wallet = new ethers.Wallet(Web3.utils.hexToBytes(pk), ethWeb3Prov);

  const { AnconNFTContract, MarketPlaceContract } = helper.getContracts(
    wallet,
    web3,
  );

  console.log('[Instance ANCON]');
  const Ancon = new AnconProtocol(ethWeb3Prov, wallet.address, anconEndpoint);
  await Ancon.initialize();

  const dagChainReduxHandler = new DAGChainReduxHandler(
    rules,
    wallet.address,
    anconEndpoint,
  );
  const indexTopicRes = await fetch(
    `${anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${wallet.address}`,
  );
  let firstTimeTopic = true;

  if (indexTopicRes.status == 200) {
    firstTimeTopic = false;
  }
  console.log('[First Time Topic is]', firstTimeTopic, '\n');

  setInterval(async () => {
    //Monitoring the chain
    const currentBlock = await web3.eth.getBlockNumber();
    const allEvents = await AnconNFTContract.getPastEvents('AddMintInfo', {
      toBlock: currentBlock,
      fromBlock: currentBlock - 3,
    });
    console.log('\n[FROM]', currentBlock - 3, '[TO]', currentBlock);
    console.log('[Events batch lenght]', allEvents.length);
    allEvents.length != 0
      ? console.log('[Event batch]', allEvents, '\n')
      : null;

    allEvents.map(async (evt) => {
      let result, rule;
      const uuid = evt.returnValues.uri;

      //Wait for the metadata to update
      await sleep(15000);

      const checkMintTopic = await fetch(
        `${anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${evt.returnValues.creator}`,
      );

      if (checkMintTopic.status === 200) {
        console.log(
          '[Got one event with uuid: ',
          uuid,
          ' Succesfully registered... proceeding to index]\n',
        );
        const checkMintTopicJson = await checkMintTopic.json();
        const eventContent = checkMintTopicJson.content;

        if (firstTimeTopic) {
          //If there is no topic made, post a metadata with the first uriIndexObject
          const uriIndexObject = { [uuid]: eventContent };

          const rawPostRes = await anconPostMetadata(
            wallet.address,
            uuid,
            Ancon.provider,
            Ancon,
            wallet,
            uriIndexObject,
          );

          const updatedIndexTopicRes = await fetch(
            `${anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${wallet.address}`,
          );

          const updatedIndexTopicJson = await updatedIndexTopicRes.json();
        } else {
          const indexTopicJson = await indexTopicRes.json();
          //indexTopicJson.content
          //ancon update metadata
          const { result, rule } = await dagChainReduxHandler.handleEvent(
            evt,
            checkMintTopicJson.content,
          );
        }
      }

      console.log('[EVENT HANDLED RES', result);
    });
  }, 5000);

  if (false) {
    // anconPostMetadata(signer.address, '', provider, anconUrl, Ancon);
  }
};

main().then();
