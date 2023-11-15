# HumanCore Psychographics X PolygonID

## Requirements 
- Node => 18.x
- Yarn 
- Git  
- Docker => 20.x
- Go => 1.20.x
- npm => 9.x.x
- Polygon ID wallet app 

## Issuer App
1. navigate to the issuer-node directory with ```cd issuer-node```
2. create .env file in issuer-node/ directory 
3. run ```source .env```
4. run ```./run.sh```
    - make sure docker is installed and the .env file is set up with the needed variables

## Scaffold Eth Contracts 
#### NOTE: we may or may not need to use this.
We are using scaffold eth for smart contract development. 

1. navigate to scaffold/ directory 
2. run ```yarn install```
3. run ```yarn chain``` to startup a hardhat node 
4. run ```yarn deploy``` to deploy smart contracts

## Iden3 contracts 
starting contracts from polygon id. More info can be found in the README

to deploy onchain issuer example contract: ```yarn hardhat run --network mumbai scripts/deployIdentityExample.ts```
currently deployed to: 0x02B50067f370a220f6E5159eCE685980ec3e61e4



### TODO 
- [] Create frontend for connecting to Humancore 
    - [] get API set up 
    - [] pull users psychographic info from API
    - [] deploy to dappling for sidequest 
    - [] make it look pretty
- [] Create on chain credential issuer 
    - [] create schema 
    - [] connect issuer to frontend so we an issue credentials 
- [] create on chain credential verifier 
    - [] do something with the credential