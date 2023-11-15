import React, { useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import IdentityForm from "../components/IdentityForm";
import CredentialForm from "../components/CredentialForm";
import ConnectWalletButton from "../components/ConnectWalletButton";

const Home = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  return (
    <Container maxW="container.md">
      <Heading as="h1" size="xl" mb={8}>
        Polygon ID Integration
      </Heading>
      {!isWalletConnected ? (
        <ConnectWalletButton onConnect={handleWalletConnect} />
      ) : (
        <>
          <IdentityForm />
          <CredentialForm />
        </>
      )}
    </Container>
  );
};

export default Home;
