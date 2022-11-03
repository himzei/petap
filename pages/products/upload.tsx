import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { NextPage } from "next";
import { MdAddAPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const onValid = (data: UploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Upload Product">
      <VStack as="form" p={4} spacing={8} onSubmit={handleSubmit(onValid)}>
        <Box
          as="label"
          w="full"
          h={44}
          rounded="md"
          border="3px"
          borderColor="gray.200"
          borderStyle={"dashed"}
          color="gray.200"
          _hover={{
            borderColor: "gray.300",
            color: "gray.300",
          }}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <MdAddAPhoto size={40} />
          <Input type="file" hidden />
        </Box>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} type="text" />
          <FormHelperText>Wenever share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>price</FormLabel>
          <Input {...register("price")} type="number" />
          <FormHelperText> never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")} size="md" rows={6} />
        </FormControl>
        <Button type="submit" w="full" colorScheme={"blue"}>
          {loading ? <Spinner /> : "Upload"}
        </Button>
      </VStack>
    </Layout>
  );
};

export default Upload;
