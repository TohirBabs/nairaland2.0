import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import {
  defaultMenuItem,
  directoryMenuState,
} from "../../atoms/directoryMenuAtom";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory";
import RightContent from "./RightContent";
import SearchInput from "./SearchInput";
import router from "next/router";
import useDirectory from "../../hooks/useDirectory";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  // Use <Link> for initial build; implement directory logic near end
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      as="header"
      position="fixed"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="saturate(180%) blur(5px)"
      w="full"
      height={{ base: "50px", md: "60px" }}
      padding="10px 1rem"
      justifyContent="space-between"
      zIndex={1000}
    >
      <RightContent user={user as User} />
      <Flex
        align="center"
        gap={1}
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/Logo.svg" height="2.5rem" alt="" />
        <Image
          alt=""
          display={{ base: "none", md: "unset" }}
          src="/images/nairalandText.svg"
          height="20px"
        />
      </Flex>
      {/* {user && <Directory />} */}
      {/* <SearchInput user={user as User} /> */}
      <RightContent user={user as User} />
    </Flex>
  );
};
export default Navbar;
