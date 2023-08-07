import { Box, Flex, Heading, IconButton, Image, Stack } from "@chakra-ui/react";
import { FaBackward } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import MenuWrapper from "../Layout/MenuWrapper";
import PersonalHome from "./Community/PersonalHome";
import Recommendations from "./Community/Recommendations";
// import Image from "next/image";
import SearchInput from "./SearchInput";

type Props = {
  open?: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<Props> = ({ open, toggleMenu }) => {
  return (
    <Stack
      borderRadius={25}
      bgColor={"gray.900"}
      m={{ base: "3px", md: "10px" }}
      spacing={1}
      border="2px solid"
      borderColor={"gray.400"}
      width={{ base: "334px", md: "350px" }}
      alignItems="center"
      transition={"all 0.2s"}
      p={2}
      minHeight={"96vh"}
    >
      <Flex width={"full"} alignItems="center" justifyContent={"space-between"}>
        <MenuWrapper />
        <Flex gap={1} cursor="pointer" alignItems="center">
          <Image src="/images/Logo.svg" height="1.8rem" alt="" />
          <Heading color={"white"} fontFamily="Comfortaa" fontSize={"1.4rem"}>
            hazh
          </Heading>
        </Flex>
        <IoArrowBackCircle
          onClick={() => toggleMenu(!open)}
          fontSize={"40px"}
          color="white"
        />
      </Flex>

      {/* <SearchInput /> */}
      <Recommendations />
      <PersonalHome />
    </Stack>
  );
};

export default Sidebar;
