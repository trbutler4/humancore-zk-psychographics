import {
  CredentialStorage,
  IdentityStorage,
  InMemoryDataSource,
  InMemoryMerkleTreeStorage,
  InMemoryPrivateKeyStore,
  EthStateStorage,
  KmsKeyType,
  KMS,
  CredentialStatusType,
  BjjProvider,
  CredentialWallet,
  IdentityWallet,
  CredentialStatusResolverRegistry,
  IssuerResolver,
  RHSResolver,
} from "@0xpolygonid/js-sdk";
import { ethers } from "ethers";

let provider;

// This function can be triggered when the user clicks a 'Connect Wallet' button
export async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      // Request account access if needed
      await provider.send("eth_requestAccounts", []);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("MetaMask is not installed!");
  }
}

const dataStorage = {
  credential: new CredentialStorage(new InMemoryDataSource()),
  identity: new IdentityStorage(
    new InMemoryDataSource(),
    new InMemoryDataSource()
  ),
  mt: new InMemoryMerkleTreeStorage(40),
  states: new EthStateStorage(provider),
};

const memoryKeyStore = new InMemoryPrivateKeyStore();
const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
const kms = new KMS();
kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);

const statusRegistry = new CredentialStatusResolverRegistry();
statusRegistry.register(
  CredentialStatusType.SparseMerkleTreeProof,
  new IssuerResolver()
);
statusRegistry.register(
  CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
  new RHSResolver(dataStorage.states)
);

const credWallet = new CredentialWallet(dataStorage, statusRegistry);
const wallet = new IdentityWallet(kms, dataStorage, credWallet);

export async function createIdentity(seedPhrase) {
  const { did, credential } = await wallet.createIdentity({
    method: DidMethod.Iden3,
    blockchain: Blockchain.Polygon,
    networkId: NetworkId.Mumbai,
    seed: seedPhrase,
    revocationOpts: {
      type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      id: "https://rhs-staging.polygonid.me",
    },
  });
  return { did, credential };
}

export async function issueCredential(issuerDID, claimReq) {
  const issuerCred = await wallet.issueCredential(issuerDID, claimReq);
  return issuerCred;
}

export async function generateProof(proofReq, userDID) {
  const { proof, vp } = await proofService.generateProof(proofReq, userDID);
  return { proof, vp };
}

export async function verifyProof(proof) {
  const sigProofOk = await proofService.verifyProof(
    proof,
    CircuitId.AtomicQuerySigV2
  );
  return sigProofOk;
}
