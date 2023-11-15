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

## Scaffold Eth Contracts 
We are using scaffold eth for smart contract development. 

1. navigate to scaffold/ directory 
2. run ```yarn install```
3. run ```yarn chain``` to startup a hardhat node 
4. run ```yarn deploy``` to deploy smart contracts




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