import { VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import ProductList from "@components/product-list";
import { NextPage } from "next";

const Bought: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <VStack spacing={5}>
        <ProductList kind="purchases" />
      </VStack>
    </Layout>
  );
};

export default Bought;
