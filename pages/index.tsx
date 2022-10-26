import type { NextPage } from "next";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GrSchedule } from "react-icons/gr";
import { FcMenu } from "react-icons/fc";
import { RiMapPinRangeLine } from "react-icons/ri";
import { AiOutlineMessage, AiOutlineBell } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { BiBuildingHouse } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Item from "@components/item";

const Home: NextPage = () => {
  return (
    <VStack title="홈">
      <VStack w="xl" spacing={1}>
        {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
          <Item key={i} />
        ))}
      </VStack>
      <HStack position="absolute" top={2} w="xl" h={12}>
        <HStack w="full" justifyContent={"space-between"}>
          <Menu>
            <MenuButton
              variant="link"
              as={Button}
              rightIcon={<MdKeyboardArrowDown />}
            >
              연경동
            </MenuButton>
            <MenuList>
              <MenuItem>연경동</MenuItem>
              <MenuItem>문화동</MenuItem>
              <MenuItem>우리 동네 설정하기</MenuItem>
            </MenuList>
          </Menu>
          <HStack spacing={4}>
            <Box>
              <FiSearch size={24} />
            </Box>
            <Box>
              <FcMenu size={24} />
            </Box>
            <Box>
              <AiOutlineBell size={24} />
            </Box>
          </HStack>
        </HStack>
      </HStack>
      <HStack
        w="xl"
        position="fixed"
        bottom={2}
        justifyContent="space-around"
        h="50px"
        py={3}
      >
        <Grid templateColumns={"repeat(5, 1fr)"} w="full">
          <GridItem>
            <VStack alignItems={"center"}>
              <GrSchedule size={24} />
              <Text>홈</Text>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack alignItems={"center"}>
              <BiBuildingHouse size={24} />
              <Text>동네생활</Text>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack alignItems={"center"}>
              <RiMapPinRangeLine size={24} />
              <Text>내근처</Text>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack alignItems={"center"}>
              <AiOutlineMessage size={24} />
              <Text>채팅</Text>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack alignItems={"center"}>
              <GrUserSettings size={24} />
              <Text>내정보</Text>
            </VStack>
          </GridItem>
        </Grid>
      </HStack>
    </VStack>
  );
};

export default Home;
