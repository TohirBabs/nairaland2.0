import { Flex, Image, Stack } from "@chakra-ui/react";
// import Image from "next/image";
import PersonalHome from "../Community/PersonalHome";
import Premium from "../Community/Premium";
import Recommendations from "../Community/Recommendations";

type Props = {
  open?: boolean;
};

const Sidebar: React.FC<Props> = ({ open }) => {
  return (
    <Stack
      border={"1px solid"}
      borderColor=" gray.300"
      background="white"
      borderRadius={20}
      padding={1}
      spacing={5}
      width={{ base: "300px", md: "350px" }}
      alignItems="center"
      transition={"all 0.2s"}
      p={2}
    >
      <Flex
        align="center"
        gap={1}
        cursor="pointer"
        p={1}
        alignItems="center"
        ml={3}
      >
        <Image src="/images/Logo.svg" height="2.5rem" alt="" />
        <Image
          alt=""
          display={{ base: "none", md: "unset" }}
          src="/images/nairalandText.svg"
          height="30px"
        />
      </Flex>
      <Recommendations />
      <Premium />
      <PersonalHome />
      <Recommendations />
      <Premium />
    </Stack>
  );
};

export default Sidebar;
