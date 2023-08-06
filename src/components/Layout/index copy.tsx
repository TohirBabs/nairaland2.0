import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FaCircle, FaPlusCircle } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";

import Sidebar from "../Sidebar";
import SearchInput from "../Sidebar/SearchInput";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [windowSize, setwindowSize] = React.useState(0);
  React.useEffect(() => {
    setwindowSize(window.innerHeight);
  }, []);
  return (
    <Flex
      width={"100vw"}
      height={{ base: windowSize, md: "100vh" }}
      overflow="hidden"
      position={"relative"}
    >
      {false && (
        <Box
          position={"fixed"}
          left={"0"}
          zIndex={100}
          backgroundColor={"rgba(0,0,0,0.5)"}
          height={{ base: menuOpen ? "100vh" : "auto" }}
          width={{ base: "full", md: "0" }}
        />
      )}
      <Flex width={"max-content"} height="max-content">
        <Box
          zIndex={1000}
          overflowY={"auto"}
          position={{ base: "relative", md: "fixed" }}
          height={{ base: windowSize, md: "100vh" }}
          transition="all 0.5s"
          width={{ base: menuOpen ? "340px" : "0", md: "370px" }}
        >
          <Sidebar open={menuOpen} toggleMenu={setMenuOpen} />
        </Box>

        <Box
          height={{ base: windowSize, md: "100vh" }}
          px={1}
          pl={{ base: "0", md: "370px" }}
          minWidth={{ base: "100vw" }}
          transition="all 0.3s"
          overflowY={menuOpen ? "hidden" : "auto"}
          position="relative"
          sx={{
            "&::-webkit-scrollbar": {
              width: "1rem",
              borderRadius: "0.5rem",
              backgroundColor: `transparent`,
            },
            "&::-webkit-scrollbar-thumb": {
              border: "4px solid rgba(0, 0, 0, 0)",
              backgroundClip: "padding-box",
              borderRadius: "0.5rem",
              width: "0.5rem",
              backgroundColor: `gray.400`,
            },
            "&::-webkit-scrollbar-track": {
              marginTop: "64px",
              marginBottom: "1rem",
            },
          }}
        >
          <Flex
            as={"header"}
            zIndex={1}
            position={{ base: "sticky", md: "relative" }}
            right={0}
            top={0}
            gap={2}
            width="100%"
            maxWidth={"100vw"}
            overflowX={"auto"}
            backgroundColor={{
              base: "rgba(226, 232, 240, 0.5)",
              md: "transparent",
            }}
            backdropFilter="saturate(180%) blur(5px)"
            alignItems={"center"}
            p={{ base: 1, md: 3 }}
            px={3}
          >
            <Box
              display={{ base: "block", md: "none" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HiPlusCircle fontSize={"3rem"} color="green" />
            </Box>
            <Flex gap={2}>
              <Tag
                size="sm"
                border="1px solid"
                p={3}
                height="max-content"
                colorScheme="cyan"
                borderRadius="full"
                borderColor={"gray.400"}
              >
                🔬
                <TagLabel ml={1}>explore</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag
                size="sm"
                border="1px solid"
                p={3}
                height="max-content"
                colorScheme="red"
                borderRadius="full"
                borderColor={"gray.400"}
              >
                🎧
                <TagLabel ml={1}>music</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag
                size="sm"
                p={3}
                height="max-content"
                border="1px solid"
                borderColor={"gray.400"}
                colorScheme="messenger"
                borderRadius="full"
              >
                🚀
                <TagLabel ml={1}>technology</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag
                size="sm"
                p={3}
                height="max-content"
                border="1px solid"
                borderColor={"gray.400"}
                colorScheme="blackAlpha"
                borderRadius="full"
              >
                😹
                <TagLabel ml={1}>laughs</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag
                size="sm"
                p={3}
                height="max-content"
                border="1px solid"
                borderColor={"gray.400"}
                colorScheme="yellow"
                borderRadius="full"
              >
                🔥
                <TagLabel ml={1}>amazing</TagLabel>
                <TagCloseButton />
              </Tag>
            </Flex>
            {/* <MenuWrapper /> */}
          </Flex>

          {/* <Box height="64px" width="full" /> */}

          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
