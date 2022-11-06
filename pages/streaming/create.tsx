import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { Stream } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  live: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loading) return;
    console.log(form);
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streaming/${data.stream.id}`);
    }
  });
  return (
    <Layout canGoBack title="Go live">
      <VStack
        as="form"
        spacing={4}
        py={10}
        px={4}
        onSubmit={handleSubmit(onValid)}
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register("name", { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea rows={4} {...register("description")} />
        </FormControl>
        <Button type="submit">{loading ? <Spinner /> : "전송하기"}</Button>
      </VStack>
    </Layout>
  );
};

export default Create;
