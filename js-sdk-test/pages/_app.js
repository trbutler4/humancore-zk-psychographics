import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Toaster />
    </ChakraProvider>
  );
}
