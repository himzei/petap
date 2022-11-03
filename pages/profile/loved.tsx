import { VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import ProductList from "@components/product-list";
import { NextPage } from "next";

const Loved: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <VStack spacing={5}>
        <ProductList kind="favs" />
      </VStack>
    </Layout>
  );
};

export default Loved;
