import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrSchedule } from "react-icons/gr";
import { FcMenu } from "react-icons/fc";
import { RiMapPinRangeLine } from "react-icons/ri";
import { AiOutlineMessage, AiOutlineBell } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { BiBuildingHouse } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { MdArrowBackIosNew } from "react-icons/md";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <Box w="full" display={"flex"} justifyContent="center">
      <HStack
        position="fixed"
        top={0}
        bg="white"
        maxWidth={"lg"}
        w="full"
        h={12}
        px={10}
        fontSize={"lg"}
        fontWeight={600}
        color={"gray.600"}
        justifyContent="center"
        alignItems="center"
        borderBottom={"1px"}
        borderColor="gray.200"
      >
        {canGoBack ? (
          <Box onClick={onClick} position="absolute" left={4} cursor="pointer">
            <MdArrowBackIosNew size={20} />
          </Box>
        ) : null}
        {title ? <span>{title}</span> : null}
      </HStack>
      <Box pt={12} pb={24} w="lg">
        {children}
      </Box>
      {hasTabBar ? (
        <HStack
          position="fixed"
          bottom={0}
          bg="white"
          maxWidth={"lg"}
          color="gray.700"
          w="full"
          pb={5}
          pt={3}
          justifyContent="space-between"
          fontSize={"xs"}
          borderTop="1px"
          borderColor="gray.200"
        >
          <Grid templateColumns={"repeat(5, 1fr)"} w="full" borderTop={2}>
            <Link href="/">
              <GridItem cursor={"pointer"}>
                <VStack alignItems={"center"}>
                  <GrSchedule size={24} />
                  <Text>홈</Text>
                </VStack>
              </GridItem>
            </Link>
            <Link href="/community">
              <GridItem cursor={"pointer"}>
                <VStack alignItems={"center"}>
                  <BiBuildingHouse size={24} />
                  <Text>동네생활</Text>
                </VStack>
              </GridItem>
            </Link>
            <GridItem>
              <VStack alignItems={"center"}>
                <RiMapPinRangeLine size={24} />
                <Text>내근처</Text>
              </VStack>
            </GridItem>
            <Link href="/streaming">
              <GridItem>
                <VStack alignItems={"center"}>
                  <AiOutlineMessage size={24} />
                  <Text>채팅</Text>
                </VStack>
              </GridItem>
            </Link>
            <Link href="/profile">
              <GridItem>
                <VStack alignItems={"center"}>
                  <GrUserSettings size={24} />
                  <Text>프로필</Text>
                </VStack>
              </GridItem>
            </Link>
          </Grid>
        </HStack>
      ) : null}
    </Box>
  );
}
