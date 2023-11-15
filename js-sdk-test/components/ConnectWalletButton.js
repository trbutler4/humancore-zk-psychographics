import React from "react";
import { Button } from "@chakra-ui/react";
import { connectWallet } from "../utils/polygonId";

const ConnectWalletButton = ({ onConnect }) => {
  const handleConnect = async () => {
    await connectWallet();
    onConnect();
  };

  return (
    <Button onClick={handleConnect} colorScheme="teal">
      Connect MetaMask Wallet
    </Button>
  );
};

export default ConnectWalletButton;
