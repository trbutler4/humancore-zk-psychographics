import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { createIdentity } from "../utils/polygonId";

const IdentityForm = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { did, credential } = await createIdentity(seedPhrase);
      toast({
        title: "Identity Created",
        description: `DID: ${did}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Seed Phrase</FormLabel>
          <Input
            type="text"
            value={seedPhrase}
            onChange={(e) => setSeedPhrase(e.target.value)}
            placeholder="Enter seed phrase"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create Identity
        </Button>
      </form>
    </Box>
  );
};

export default IdentityForm;
