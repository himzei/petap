import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  isLiked: boolean;
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({});
  };
  return (
    <Layout canGoBack>
      <Box p={4}>
        <Box mb={8}>
          <Box h={96} bg="gray.200" />
          <HStack
            cursor={"pointer"}
            py={3}
            borderBottom="1px"
            borderColor={"gray.200"}
            alignItems={"center"}
            spacing={3}
          >
            <Avatar
              name={`${data?.product?.user?.name}`}
              src="https://bit.ly/tioluwani-kolawole"
            />
            <Box>
              <Text fontSize={"sm"} color={"gray.900"} fontWeight="600">
                {data?.product?.user?.name}
              </Text>
              <Link href={`/users/profile/${data?.product?.user?.id}`}>
                <Text fontSize={"xs"}>View profile &rarr; </Text>
              </Link>
            </Box>
          </HStack>
          <Box mt={5}>
            <VStack spacing={0} alignItems="flex-start">
              <Text fontSize={"3xl"} fontWeight={600} color={"gray.900"}>
                {data?.product?.name}
              </Text>
              <Text fontSize="2xl" color="gray.900">
                {data?.product?.price}
              </Text>
            </VStack>
            <Text my={6}>{data?.product?.description}</Text>
            <HStack
              spacing={2}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Button w="lg" colorScheme={"green"}>
                Talk to Seller
              </Button>
              <Button rounded="md" variant="link">
                {data?.isLiked ? (
                  <AiFillHeart size={20} onClick={onFavClick} color="tomato" />
                ) : (
                  <AiOutlineHeart size={20} onClick={onFavClick} />
                )}
              </Button>
            </HStack>
          </Box>
        </Box>
        <VStack spacing={8} w="full" alignItems={"flex-start"}>
          <Text fontWeight={600} fontSize="2xl">
            관련상품
          </Text>
          <Grid w="full" templateColumns={"1fr 1fr"} gap={4} rowGap={8}>
            {data?.relatedProducts?.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <GridItem cursor={"pointer"}>
                  <Box h={56} w="full" mb={4} bg="gray.200" />
                  <Text color="bg.700">{product.name}</Text>
                  <Text fontSize={"sm"} color="gray.900">
                    ₩{product.price}
                  </Text>
                </GridItem>
              </Link>
            ))}
          </Grid>
        </VStack>
      </Box>
    </Layout>
  );
};

export default ItemDetail;
