import { useEffect } from "react";
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

interface EditProfileForm {
  email?: string;
  username?: string;
  formErrors?: string;
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
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
  }, [user]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = ({ email, username }: EditProfileForm) => {
    if (loading) return;
    if (email === "" || username === "") {
      return setError("formErrors", { message: "이메일은 입력해야 합니다." });
    }
    editProfile({ email });
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data]);
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
          <Avatar />
          <FormControl>
            <FormLabel px={2} transform={"translateY(3px)"} cursor="pointer">
              프로필 사진 수정하기 &rarr;
            </FormLabel>
            <Input type="file" hidden accept="image/*" />
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
