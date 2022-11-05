import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import { NextPage } from "next";
import Link from "next/link";
import { BsCartPlusFill, BsFillBagCheckFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar, AiFillLike } from "react-icons/ai";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Review, User } from "@prisma/client";

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

const Profile: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ReviewsResponse>("/api/reviews");
  return (
    <Layout hasTabBar title="나의 펫앱">
      <VStack px={4} spacing={8}>
        <HStack alignItems={"center"} mt={4} spacing={4} w="full">
          <Avatar
            src={`https://imagedelivery.net/N-UcEUejRMIK2RZhJ4DnqA/${user?.avatar}/avatar`}
          />
          <VStack alignItems={"flex-start"} spacing={0}>
            <Text fontSize={"medium"} color="gray.900">
              {user?.name}
            </Text>
            <Link href="/profile/edit">
              <Text fontSize="sm" color="gray.700">
                프로필 수정하기 &rarr;
              </Text>
            </Link>
          </VStack>
        </HStack>
        <HStack justifyContent={"space-around"} w="full">
          <Link href="/profile/sold">
            <VStack alignItems={"center"}>
              <Box
                w={14}
                h={14}
                color="white"
                bg={"blue.400"}
                rounded="full"
                display={"flex"}
                alignItems={"center"}
                justifyContent="center"
              >
                <BsCartPlusFill size={24} />
              </Box>
              <Text fontSize="sm" fontWeight={"bold"} color="gray.700">
                판매내역
              </Text>
            </VStack>
          </Link>
          <Link href="/profile/bought">
            <VStack alignItems={"center"}>
              <Box
                w={14}
                h={14}
                color="white"
                bg={"blue.400"}
                rounded="full"
                display={"flex"}
                alignItems={"center"}
                justifyContent="center"
              >
                <BsFillBagCheckFill size={24} />
              </Box>
              <Text fontSize="sm" fontWeight={"bold"} color="gray.700">
                구매내역
              </Text>
            </VStack>
          </Link>
          <Link href="/profile/loved">
            <VStack alignItems={"center"}>
              <Box
                w={14}
                h={14}
                color="white"
                bg={"blue.400"}
                rounded="full"
                display={"flex"}
                alignItems={"center"}
                justifyContent="center"
              >
                <AiFillLike size={24} />
              </Box>
              <Text fontSize="sm" fontWeight={"bold"} color="gray.700">
                관심목록
              </Text>
            </VStack>
          </Link>
        </HStack>
        {data?.reviews.map((review) => (
          <VStack w="full" key={review.id} spacing={2} alignItems="flex-start">
            <HStack
              alignItems={"center"}
              w="full"
              spacing={4}
              justifyContent="flex-start"
            >
              <Avatar size={"sm"} />
              <VStack spacing={0} alignItems="flex-start">
                <Text fontSize={"sm"} fontWeight="bold" color="gray.500">
                  {review.createdBy.name}
                </Text>
                <HStack alignItems={"center"} spacing={0}>
                  {[1, 2, 3, 4, 5].map((star) =>
                    review.score >= star ? (
                      <AiFillStar color="gold" key={star} />
                    ) : (
                      <AiOutlineStar color="lightgray" key={star} />
                    )
                  )}
                </HStack>
              </VStack>
            </HStack>
            <Box>
              <Text color="gray.600" fontSize={"sm"}>
                {review.review}
              </Text>
            </Box>
          </VStack>
        ))}
      </VStack>
    </Layout>
  );
};

export default Profile;
