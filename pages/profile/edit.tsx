import { useEffect, useState } from "react";
import {
  Avatar,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import useMutation from "@libs/client/useMutation";
import { join } from "path";

interface EditProfileForm {
  email?: string;
  username?: string;
  formErrors?: string;
  avatar?: FileList;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/N-UcEUejRMIK2RZhJ4DnqA/${user?.avatar}/public`
      );
  }, [user]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = async ({ email, username, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" || username === "") {
      return setError("formErrors", { message: "이메일은 입력해야 합니다." });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      editProfile({ email, avatarId: id });
    } else {
      editProfile({ email });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack title="프로필 수정하기">
      <VStack
        as="form"
        spacing={4}
        px={4}
        w="full"
        alignItems={"flex-start"}
        py={4}
        onSubmit={handleSubmit(onValid)}
      >
        <HStack alignItems={"center"} spacing={3}>
          <Avatar src={avatarPreview} />
          <FormControl>
            <FormLabel px={2} transform={"translateY(3px)"} cursor="pointer">
              프로필 사진 수정하기 &rarr;
            </FormLabel>
            <Input
              {...register("avatar")}
              type="file"
              hidden
              accept="image/*"
            />
          </FormControl>
        </HStack>
        {/* <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" {...register("username")} />
        </FormControl> */}
        <FormControl>
          <FormLabel>Eamil Address</FormLabel>
          <Input type="email" {...register("email")} />
        </FormControl>
        <Button type="submit" w="full" colorScheme="blue">
          {loading ? <Spinner /> : "Upload Profile"}
        </Button>
        {errors.formErrors ? (
          <HStack color="red.400">
            <AiFillWarning />
            <Text my={1} fontWeight={"bold"}>
              {errors.formErrors.message}
            </Text>
          </HStack>
        ) : null}
      </VStack>
    </Layout>
  );
};

export default EditProfile;
