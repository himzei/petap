import { AspectRatio, Image, Text, VStack } from "@chakra-ui/react";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import { Stream } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { BsFillPencilFill } from "react-icons/bs";

interface StreamResponse {
  ok: boolean;
  streams: Stream[];
}

const Streams: NextPage = () => {
  const { data } = useSWR<StreamResponse>(`/api/streams?page=`);
  console.log(data);
  return (
    <Layout hasTabBar title="라이브">
      <VStack spacing="4">
        {data?.streams.map((stream) => (
          <Link key={stream.id} href={`/streaming/${stream.id}`}>
            <VStack pt={4} px={4} w="full" alignItems={"flex-start"}>
              <AspectRatio w="full" ratio={16 / 9}>
                <Image
                  src="https://bit.ly/naruto-sage"
                  alt="naruto"
                  objectFit="cover"
                />
              </AspectRatio>
              <Text fontSize="2xl" fontWeight={"bold"} mt={2} color="gray.900">
                {stream.name}
              </Text>
            </VStack>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <BsFillPencilFill />
        </FloatingButton>
      </VStack>
    </Layout>
  );
};

export default Streams;
