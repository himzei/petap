import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";

interface MessageProps {
  message: string;
  reversed?: boolean | undefined;
  avatarUrl?: string;
}

export default function Message({
  message,
  avatarUrl,
  reversed,
}: MessageProps) {
  return (
    <HStack
      alignItems={"center"}
      spacing={2}
      flexDirection={reversed ? "row-reverse" : undefined}
      w="full"
    >
      <Avatar w={8} h={8} ml={reversed ? "2" : "0"} />
      <Text
        w="1/2"
        fontSize={"sm"}
        color="gray.700"
        p={2}
        border="1px"
        borderColor="gray.300"
        rounded="md"
      >
        {message}
      </Text>
    </HStack>
  );
}
