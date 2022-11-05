import {
  Avatar,
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { Answer, Post, User } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsQuestionSquare } from "react-icons/bs";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import useSWR from "swr";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wonderings: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  console.log(data);

  const [wonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answer`);

  const onWonderClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            wonderings: data.isWondering
              ? data?.post._count.wonderings - 1
              : data?.post._count.wonderings + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    if (!loading) {
      wonder({});
    }
  };

  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);
  return (
    <Layout canGoBack>
      <Box>
        <Text
          my={4}
          ml={4}
          display="inline-flex"
          alignItems={"center"}
          px={2}
          py={1}
          rounded="full"
          fontSize="xs"
          fontWeight="500"
          bg="gray.100"
          color="gray.800"
        >
          동네질문
        </Text>
        <HStack mb={3} px={4} cursor="pointer" alignItems="center" spacing={3}>
          <Avatar
            src={
              data?.post?.user?.avatar
                ? `https://imagedelivery.net/N-UcEUejRMIK2RZhJ4DnqA/${data?.post?.user?.avatar}/avatar`
                : "https://bit.ly/tioluwani-kolawole"
            }
            w={10}
            h={10}
          />
          <Box>
            <Text fontSize="sm" fontWeight={500} color="gray.700">
              {data?.post?.user.name}
            </Text>
            <Link href={`/users/profile/${data?.post?.user?.id}`}>
              <Text fontSize="xs" fontWeight={500} color="gray.500">
                View Profile &rarr;
              </Text>
            </Link>
          </Box>
        </HStack>
        <HStack
          px={4}
          spacing={5}
          mt={3}
          color="gray.700"
          py={3}
          borderTop="1px"
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Text as="span" color="red.400" fontSize="medium">
            Q.
          </Text>
          <Text>{data?.post?.question}</Text>
        </HStack>
        {/* 궁금해요 답변 아이콘 */}
        <HStack px={4} py={2} borderBottom="1px" borderColor="gray.200">
          <HStack
            as="button"
            color={data?.isWondering ? "blue.500" : "black"}
            fontWeight={data?.isWondering ? "600" : "400"}
            onClick={onWonderClick}
          >
            <BsQuestionSquare />
            <Text as="span" fontSize={"xs"}>
              궁금해요 {data?.post?._count.wonderings}
            </Text>
          </HStack>
          <HStack>
            <MdOutlineQuestionAnswer />
            <Text as="span" fontSize={"xs"}>
              답변 {data?.post?._count.answers}
            </Text>
          </HStack>
        </HStack>
        {/* 질문에 대한 답변 */}
        <VStack px={3} my={4} spacing={5}>
          {data?.post?.answers.map((answer) => (
            <HStack
              w="full"
              alignItems={"flex-start"}
              spacing={3}
              key={answer.id}
            >
              <Avatar
                src={
                  answer?.user?.avatar
                    ? `https://imagedelivery.net/N-UcEUejRMIK2RZhJ4DnqA/${answer?.user?.avatar}/avatar`
                    : "https://bit.ly/tioluwani-kolawole"
                }
                m={1.5}
                w={8}
                h={8}
              />
              <VStack alignItems={"flex-start"} spacing={2}>
                <VStack spacing={0} alignItems="flex-start">
                  <Link href={`/users/profile/${answer.id}`}>
                    <Text
                      fontSize={"sm"}
                      fontWeight="medium"
                      color={"gray.700"}
                    >
                      {answer.user.name}
                    </Text>
                  </Link>
                  <Text fontSize="xs" color="gray.500">
                    {/* {answer.createdAt} */}
                  </Text>
                </VStack>
                <Text color="gray.700" mt={2}>
                  {answer.answer}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
        <VStack spacing={2} as="form" onSubmit={handleSubmit(onValid)}>
          <Textarea
            placeholder="답변을 등록해 주세요"
            rows={4}
            {...register("answer", { required: true, minLength: 5 })}
          />
          <Button type="submit" colorScheme={"blue"} w="full">
            {answerLoading ? <Spinner /> : "답변 등록하기"}
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
};

export default CommunityPostDetail;
