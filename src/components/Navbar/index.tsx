import React from "react";
import { Avatar, Box, Flex, Icon, Image } from "@chakra-ui/react";
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
import SearchInput from "../Sidebar/SearchInput";
import router from "next/router";
import useDirectory from "../../hooks/useDirectory";
import { IoNotificationsOutline } from "react-icons/io5";
import MenuWrapper from "./RightContent/ProfileMenu/MenuWrapper";

const Navbar: React.FC = ({ onOpen }: any) => {
  const [user] = useAuthState(auth);

  // Use <Link> for initial build; implement directory logic near end
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      as="header"
      position="fixed"
      left={0}
      w={{ base: "full", md: "calc(100% - 304px)" }}
      height={"60px"}
      zIndex={1000}
      backgroundColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="saturate(180%) blur(5px)"
      padding={{ base: 2, md: "10px 12px 10px 16px" }}
      justifyContent="space-between"
      alignItems="center"
      borderRadius={"0 0 15px 15px"}
      borderBottom="1px solid"
      borderColor={"gray.200"}
    >
      <Flex onClick={onOpen} alignItems="center">
        <Flex alignItems="center">
          {user ? (
            <>
              <Avatar src={user.photoURL || ""} borderRadius={10} size="sm" />
            </>
          ) : (
            <Avatar bg={"gray.400"} borderRadius={10} size="sm" />
          )}
        </Flex>
      </Flex>
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
          height="30px"
        />
      </Flex>
      {/* {user && <Directory />} */}
      {/* <SearchInput user={user as User} /> */}

      <RightContent user={user as User} />
    </Flex>
  );
};
export default Navbar;
