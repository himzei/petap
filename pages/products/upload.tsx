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
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import Image from "next/image";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const onValid = async ({ name, price, description }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      console.log("hlleo", uploadURL);
      const form = new FormData();
      form.append("file", photo[0], name);
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      uploadProduct({ name, price, description, photoId: id });
    } else {
      uploadProduct({ name, price, description });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <Layout canGoBack title="Upload Product">
      <VStack as="form" p={4} spacing={8} onSubmit={handleSubmit(onValid)}>
        {photoPreview ? (
          <img src={photoPreview} alt="product image" />
        ) : (
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
            <Input {...register("photo")} type="file" hidden accept="image/*" />
          </Box>
        )}
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
