import { Flex, Heading, Image, Stack } from "@chakra-ui/react";
// import Image from "next/image";
import PersonalHome from "../Community/PersonalHome";
import Premium from "../Community/Premium";
import Recommendations from "../Community/Recommendations";
import SearchInput from "../Navbar/SearchInput";

type Props = {
  open?: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<Props> = ({ open, toggleMenu }) => {
  return (
    <Stack
      borderRadius={20}
      bgColor={"gray.800"}
      m={"10px"}
      spacing={2}
      width={{ base: "310px", md: "350px" }}
      alignItems="center"
      transition={"all 0.2s"}
      p={3}
      minHeight={"96vh"}
    >
      <Flex
        align="center"
        gap={1}
        cursor="pointer"
        p={2}
        alignItems="center"
        ml={3}
        onClick={() => toggleMenu(!open)}
      >
        <Image src="/images/Logo.svg" height="2.2rem" alt="" />
        <Heading color={"white"} fontFamily="Comfortaa" fontSize={"1.5rem"}>
          nairaland
        </Heading>
      </Flex>
      <SearchInput />
      <Recommendations />
      <Premium />
      <PersonalHome />
    </Stack>
  );
};

export default Sidebar;
