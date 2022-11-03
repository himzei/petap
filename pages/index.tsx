import type { NextPage } from "next";
import { VStack } from "@chakra-ui/react";
import Item from "@components/item";
import useUser from "@libs/client/useUser";
import Layout from "@components/layout";
import Head from "next/head";
import FloatingButton from "@components/floating-button";
import { BsFillPencilFill } from "react-icons/bs";
import useSWR from "swr";
import { Product } from "@prisma/client";
import { useEffect } from "react";

export interface ProductWintCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWintCount[];
}

const Home: NextPage = () => {
  const { data } = useSWR<ProductsResponse>("/api/products");

  useEffect(() => {}, []);

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title> Home</title>
      </Head>

      <VStack spacing={1} w="full" position="relative">
        {data?.products?.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product._count.favs}
          />
        ))}
        <FloatingButton href="/products/upload">
          <BsFillPencilFill />
        </FloatingButton>
      </VStack>
    </Layout>
  );
};

export default Home;
