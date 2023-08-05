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

// import NoUserList from "./NoUserList";
import UserList from "./UserList";

import { FaGoogle, FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { authModalState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/clientApp";

type MenuWrapperProps = {};

const MenuWrapper: React.FC<MenuWrapperProps> = ({ onOpen }: any) => {
  const [authModal, setModalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);
  console.log(user);
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

  return user ? (
    <Avatar src={user.photoURL || ""} borderRadius={15} size="md" />
  ) : (
    <Button
      colorScheme="gray"
      leftIcon={<FaGoogle />}
      onClick={() => signInWithGoogle()}
      isLoading={loading}
    >
      Sign in
    </Button>
  );
};
export default MenuWrapper;
