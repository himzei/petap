import { NextPage } from "next";
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
  VStack,
} from "@chakra-ui/react";
import { SiNaver } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const Register: NextPage = () => {
  const [signUp, { loading, data, error }] = useMutation("/api/users/register");
  const { register, handleSubmit } = useForm<RegisterForm>();
  const onValid = (validForm: RegisterForm) => {
    signUp(validForm);
  };
  console.log(loading, data, error);
  return (
    <VStack h="100vh" justifyContent={"center"}>
      <VStack w="xl" p={4}>
        <Box>
          <FaDog size={28} />
        </Box>
        <Heading>펫션 회원가입</Heading>
        <VStack w="full">
          <VStack
            as="form"
            alignItems={"center"}
            w="full"
            onSubmit={handleSubmit(onValid)}
          >
            <Text>너와 내가 함께하는 반려견 놀이터</Text>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input {...register("username", { required: true })} size="sm" />
            </FormControl>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input {...register("email", { required: true })} size="sm" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input {...register("password", { required: true })} size="sm" />
            </FormControl>
            <Button type="submit" colorScheme={"blue"} w="full">
              회원가입
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

export default Register;
