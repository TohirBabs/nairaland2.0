import React from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../../atoms/authModalAtom";
import { auth } from "../../../../firebase/clientApp";

import NoUserList from "./NoUserList";
import UserList from "./UserList";

import { FaGoogle, FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";

type MenuWrapperProps = {};

const MenuWrapper: React.FC<MenuWrapperProps> = ({ onOpen }: any) => {
  const [authModal, setModalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);
  console.log(user);
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

  return user ? (
    <Menu>
      <MenuButton
        cursor="pointer"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Avatar src={user.photoURL || ""} borderRadius={10} size="md" />
      </MenuButton>
      <MenuList>
        <UserList />
      </MenuList>
    </Menu>
  ) : (
    <Button
      colorScheme="google"
      leftIcon={<FaGoogle />}
      onClick={() => signInWithGoogle()}
      isLoading={loading}
    >
      Sign in
    </Button>
  );
};
export default MenuWrapper;
