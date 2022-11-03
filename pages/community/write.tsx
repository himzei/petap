import { Button, Spinner, Textarea, VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import useCoords from "@libs/client/useCoords";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  console.log(latitude, longitude);
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };
  console.log(data);
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="포스트">
      <VStack as="form" onSubmit={handleSubmit(onValid)} spacing={4}>
        <Textarea
          {...register("question", { required: true })}
          placeholder="질문을 작성해주세요"
          rows={8}
        />
        <Button w="full" type="submit" colorScheme={"blue"}>
          {loading ? <Spinner /> : "작성하기"}
        </Button>
      </VStack>
    </Layout>
  );
};

export default Write;
