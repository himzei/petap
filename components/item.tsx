import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";

interface ItemProps {
  id: number;
  title: string;
  price: number;
  hearts: number;
  comments: number;
}

export default function Item({
  id,
  title,
  price,
  hearts,
  comments,
}: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <HStack justifyContent={"space-between"} w="full">
        <HStack px={4} pt={5} w="100%" spacing={4}>
          <Box rounded="sm" w={20} h={20} bg="gray.300" borderRadius={"md"} />
          <VStack pt={2} alignItems="flex-start">
            <Text>{title}</Text>
            <Text fontSize={20} fontWeight={600}>
              {price}원
            </Text>
          </VStack>
        </HStack>
        <HStack
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          w="100%"
          h={20}
        >
          <Box>
            <AiOutlineHeart /> {hearts}
          </Box>
          <Box>
            <AiOutlineMessage /> {comments}
          </Box>
        </HStack>
      </HStack>
    </Link>
  );
}
