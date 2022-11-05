import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { priceFormat } from "@libs/client/utils";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";

interface ItemProps {
  id: number;
  title: string;
  price: number;
  hearts: number;
  comments: number;
  image: string;
  createdAt?: string;
}

export default function Item({
  id,
  title,
  price,
  hearts,
  comments,
  image,
  createdAt,
}: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <HStack justifyContent={"space-between"} w="full">
        <HStack cursor="pointer" px={4} pt={5} w="100%" spacing={4}>
          <Box position="relative" w={24} h={24} rounded="lg" overflow="hidden">
            <Image
              src={`https://imagedelivery.net/N-UcEUejRMIK2RZhJ4DnqA/${image}/public`}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          {/* <Box rounded="sm" w={20} h={20} bg="gray.300" borderRadius={"md"} /> */}
          <VStack pt={2} alignItems="flex-start" spacing={1}>
            <VStack w={80} spacing={0} alignItems="flex-start">
              <Text fontWeight={600} fontSize={16}>
                {title}
              </Text>
              <HStack fontSize={14} color="gray.600">
                <Text>경북 포항시 양학동</Text>
                <Divider orientation="vertical" w="1px" />
                <Text>{createdAt?.substring(0, 10)}</Text>
              </HStack>
            </VStack>
            <HStack spacing={1} alignItems="flex-end">
              <Text fontSize={18} fontWeight={600}>
                {priceFormat(price)}
              </Text>{" "}
              <Text fontSize={12} transform={"translateY(-3px)"}>
                원
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack
          spacing={4}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          w="100%"
          h={20}
        >
          <HStack spacing={1}>
            <AiOutlineHeart /> <Box>{hearts}</Box>
          </HStack>
          <HStack spacing={1}>
            <AiOutlineMessage /> <Box>{comments}</Box>
          </HStack>
        </HStack>
      </HStack>
    </Link>
  );
}
