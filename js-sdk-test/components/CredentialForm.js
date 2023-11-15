import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { issueCredential } from "../utils/polygonId";

const CredentialForm = () => {
  const [issuerDID, setIssuerDID] = useState("");
  const [claimRequest, setClaimRequest] = useState({});
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credential = await issueCredential(issuerDID, claimRequest);
      toast({
        title: "Credential Issued",
        description: `Credential: ${JSON.stringify(credential)}`,
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

  const handleClaimRequestChange = (e) => {
    setClaimRequest({ ...claimRequest, [e.target.name]: e.target.value });
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Issuer DID</FormLabel>
          <Input
            type="text"
            value={issuerDID}
            onChange={(e) => setIssuerDID(e.target.value)}
            placeholder="Enter Issuer DID"
          />
        </FormControl>
        {/* Add fields for claimRequest attributes as needed */}
        <FormControl>
          <FormLabel>Claim Attribute</FormLabel>
          <Input
            type="text"
            name="claimAttributeName"
            onChange={handleClaimRequestChange}
            placeholder="Enter Claim Attribute Value"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Issue Credential
        </Button>
      </form>
    </Box>
  );
};

export default CredentialForm;
