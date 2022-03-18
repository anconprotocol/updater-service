import { ethers } from 'ethers';
import AnconProtocol from './AnconProtocol';

/**
  Post topic index list
 *
 * @param _address official indexer's address
 * @param _uuid the nft uuid
 * @param _web3Prov instanced Ancon class provider
 * @param Ancon instanced Ancon class
 * @param _wallet wallet instance
 * @param payload content data to be posted
 * @returns {(Object|Promise)} ancon metadata post response object
 */
export const anconPostMetadata = async (
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

  /**
    Call Ancon class post function
   * @returns object {cid, ipfs}
   **/
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

/**
  Post metadata with updated mint info
 *
 * @param _address official indexer's address
 * @param _uuid the nft uuid
 * @param _web3Prov instanced Ancon class provider
 * @param Ancon instanced Ancon class
 * @param _wallet wallet instance
 * @param oldPayload old content data to be transformed
 * @param _blockchainTxHash Blockchain mint event transaction hash
 * @param _blockchainTokenId Contract nft token id
 * @param _mintBlockNumber Block number in which the AddMintInfoEvent was emitted
 * @returns {(Object|Promise)} ancon metadata post response object
 */
export const anconUpdateMintMetadata = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  oldPayload: any,
  _blockchainTxHash: string,
  _blockchainTokenId: string,
  _mintBlockNumber: number,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  const putPayload = {
    ...oldPayload,
    blockchainTxHash: _blockchainTxHash,
    blockchainTokenId: _blockchainTokenId,
    mintBlockNumber: _mintBlockNumber,
  };

  // sign the message
  const signature = await _wallet.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(putPayload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: putPayload,
      topic: `uuid:${_uuid}`,
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

/**
  Post metadata with updated Order info
 *
 * @param _address official indexer's address
 * @param _uuid the nft uuid
 * @param _web3Prov instanced Ancon class provider
 * @param Ancon instanced Ancon class
 * @param _wallet wallet instance
 * @param oldPayload old content data to be transformed
 * @param _blockchainMakeOrderTxHash Blockchain 'MakeOrder' event transaction hash
 * @param _currentOrderHash marketplace contract internal order hash
 * @param _makeOrderBlockNumber Block number in which the 'MakeOrder' event was emitted
 * @param _price Nft price
 * @param _timestamp Block number in which the AddMintInfoEvent was emitted
 * @returns {(Object|Promise)} ancon metadata post response object
 */
export const anconUpdateMetadataMakeOrder = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  oldPayload: any,
  _blockchainMakeOrderTxHash: string,
  _currentOrderHash: string,
  _makeOrderBlockNumber: number,
  _price: number,
  _timestamp: number,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  const putPayload = {
    ...oldPayload,
    blockchainMakeOrderTxHash: _blockchainMakeOrderTxHash,
    currentOrderHash: _currentOrderHash,
    makeOrderBlockNumber: _makeOrderBlockNumber,
    price: _price,
    currentOrderTimestamp: _timestamp,
  };

  // sign the message
  const signature = await _wallet.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(putPayload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: putPayload,
      topic: `uuid:${_uuid}`,
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

/**
  Post metadata with updated Cancel Order info
 *
 * @param _address official indexer's address
 * @param _uuid the nft uuid
 * @param _web3Prov instanced Ancon class provider
 * @param Ancon instanced Ancon class
 * @param _wallet wallet instance
 * @param oldPayload old content data to be transformed
 * @returns {(Object|Promise)} ancon metadata post response object
 */
export const anconUpdateMetadataCancelOrder = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  oldPayload: any,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  const putPayload = {
    ...oldPayload,
    blockchainMakeOrderTxHash: '',
    currentOrderHash: '',
    makeOrderBlockNumber: '',
    price: '',
    currentOrderTimestamp: '',
  };

  // sign the message
  const signature = await _wallet.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(putPayload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: putPayload,
      topic: `uuid:${_uuid}`,
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

/**
  Post metadata with updated Claim info
 *
 * @param _address official indexer's address
 * @param _uuid the nft uuid
 * @param _web3Prov instanced Ancon class provider
 * @param Ancon instanced Ancon class
 * @param _wallet wallet instance
 * @param oldPayload old content data to be transformed
 * @param _buyerAddress Address of the buyer used to update the owner
 * @returns {(Object|Promise)} ancon metadata post response object
 */
export const anconUpdateMetadataClaim = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  oldPayload: any,
  _buyerAddress: string,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  const putPayload = {
    ...oldPayload,
    blockchainMakeOrderTxHash: '',
    currentOrderHash: '',
    makeOrderBlockNumber: '',
    price: '',
    currentOrderTimestamp: '',
    owner: _buyerAddress,
  };

  // sign the message
  const signature = await _wallet.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(putPayload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: putPayload,
      topic: `uuid:${_uuid}`,
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
