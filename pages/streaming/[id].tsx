import {
  AspectRatio,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "stream";
import useSWR from "swr";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const Streaming: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    `/api/streams/${router.query.id}`,
    {
      refreshInterval: 1000,
    }
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
  };
  return (
    <Layout canGoBack>
      <VStack py={10} px={4} w="full" alignItems={"flex-start"}>
        <AspectRatio w="full" ratio={1}>
          <iframe
            title="naruto"
            src="https://www.youtube.com/embed/QhBnZ6NPOY0"
            allowFullScreen
          />
        </AspectRatio>
        <VStack mt={5} alignItems="flex-start">
          <Text fontSize="3xl" fontWeight={"bold"} mt={3} color="gray.900">
            {data?.stream?.name}
          </Text>
          <Text fontSize="2xl" mt={3} color="gray.900">
            {data?.stream?.price}
          </Text>
          <Text my={6} color="gray.700">
            {data?.stream?.description}
          </Text>
        </VStack>
        <Box w="full">
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            Live Chat
          </Text>
          <VStack py={10} pb={16} spacing={4} px={2}>
            {data?.stream.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
          </VStack>
          <Box
            position="fixed"
            py={2}
            bg="white"
            bottom={0}
            w="lg"
            as="form"
            onSubmit={handleSubmit(onValid)}
          >
            <InputGroup size="md">
              <Input
                pr="3rem"
                placeholder="Enter message"
                {...register("message")}
              />
              <InputRightElement width="3rem">
                <Button
                  type="submit"
                  h="2rem"
                  size="sm"
                  color=" white"
                  colorScheme={"blue"}
                >
                  &rarr;
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      </VStack>
    </Layout>
  );
};

export default Streaming;
