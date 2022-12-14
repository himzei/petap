import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useFocusEffect,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { SiNaver, SiReactrouter } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";

interface EnterForm {
  email: string;
  password: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] = useMutation("/api/users/enter");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<EnterForm>();

  // 로그인 상태에서는 해당 페이지 안보이게
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    if (user && user.id) {
      router.replace("/");
    }
  }, [router, user]);

  const onValid = (validForm: EnterForm) => {
    const result = enter(validForm);
    console.log(result);
  };
  console.log(loading, data, error);
  return (
    <VStack h="100vh" justifyContent={"center"}>
      <VStack w="xl" p={4}>
        <Box>
          <FaDog size={28} />
        </Box>
        <Heading>펫션 입장하기</Heading>
        <VStack w="full">
          <VStack
            as="form"
            alignItems={"center"}
            w="full"
            onSubmit={handleSubmit(onValid)}
          >
            <Text>너와 내가 함께하는 반려견 놀이터</Text>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input {...register("email", { required: true })} size="sm" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input {...register("password", { required: true })} size="sm" />
            </FormControl>
            <Button type="submit" colorScheme={"blue"} w="full">
              {submitting ? "Loading..." : "로그인"}
            </Button>
            <HStack>
              <Divider />
              <Text>Or</Text>
              <Divider />
            </HStack>
            <VStack w="full">
              <HStack w="full" color="gray.500">
                <HStack
                  justifyContent={"center"}
                  border="1px"
                  py={2}
                  w="50%"
                  rounded="sm"
                  borderColor={"gray.400"}
                >
                  <SiNaver />
                </HStack>
                <HStack
                  justifyContent={"center"}
                  border="1px"
                  py={2}
                  w="50%"
                  rounded="sm"
                  borderColor={"gray.400"}
                >
                  <BsFacebook />
                </HStack>
              </HStack>
              <HStack w="full" color="gray.500">
                <HStack
                  justifyContent={"center"}
                  border="1px"
                  py={2}
                  w="50%"
                  rounded="sm"
                  borderColor={"gray.400"}
                >
                  <RiKakaoTalkFill />
                </HStack>
                <HStack
                  justifyContent={"center"}
                  border="1px"
                  py={2}
                  w="50%"
                  rounded="sm"
                  borderColor={"gray.400"}
                >
                  <AiFillGoogleCircle />
                </HStack>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Enter;
