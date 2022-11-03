import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import { NextPage } from "next";
import Link from "next/link";

import { BsFillPencilFill } from "react-icons/bs";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BsQuestionSquare } from "react-icons/bs";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import useCoords from "@libs/client/useCoords";

interface PostWithUser extends Post {
  user: User;
  _count: {
    wonderings: number;
    answers: number;
  };
}

interface PostsResponse {
  ok: boolean;
  posts: PostWithUser[];
}

const Community: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<PostsResponse>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );

  return (
    <Layout hasTabBar title="동네생활">
      <VStack spacing={4}>
        {data?.posts?.map((post) => (
          <Link href={`/community/${post.id}`} key={post.id}>
            <VStack
              w="full"
              as="a"
              cursor={"pointer"}
              pt={4}
              alignItems={"flex-start"}
            >
              <Text
                ml={4}
                alignItems="center"
                px={2}
                py={1}
                rounded="full"
                fontSize="xs"
                fontWeight="bold"
                bg="gray.200"
                color="gray.800"
              >
                동네질문
              </Text>
              <Box mt={2} px={4} color={"gray.700"}>
                <Text as="span" color="red.400" fontWeight={600}>
                  Q.
                </Text>
                <Text as="span">{post.question}</Text>
              </Box>
              <HStack
                mt={5}
                px={4}
                justifyContent={"space-between"}
                alignItems="center"
                w="full"
                color="gray.500"
                fontSize={"sm"}
              >
                <Text>{post.user.name}</Text>
                <Text>{post.createdAt}</Text>
              </HStack>
              <HStack
                px={4}
                spacing={5}
                mt={3}
                color={"gray.700"}
                py={2}
                borderTop="1px"
                borderColor="gray.200"
                w="full"
              >
                <HStack>
                  <BsQuestionSquare />
                  <Text as="span" fontSize={"xs"}>
                    궁금해요 {post._count.wonderings}
                  </Text>
                </HStack>
                <HStack>
                  <MdOutlineQuestionAnswer />
                  <Text as="span" fontSize={"xs"}>
                    답변 {post._count.answers}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Link>
        ))}
        <FloatingButton href="/community/write">
          <BsFillPencilFill />
        </FloatingButton>
      </VStack>
    </Layout>
  );
};

export default Community;
